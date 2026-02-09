import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createOrder = async (req, res) => {
  try {  const cart = await Cart.findOne({ user: req.user.id }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.productId;

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Sorry, product '${product.title}' is out of stock. Available: ${product.stock}` 
        });
      }

      totalPrice += product.price * item.quantity;
      
      orderItems.push({
        productId: product._id,
        quantity: item.quantity
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      totalPrice: totalPrice,
      orderStatus: "Processing",
      shippingAddress: req.body.shippingAddress || "Not Provided"
    });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity } 
      });
    }

  
    cart.items = [];
    await cart.save();

    res.status(201).json(order);

  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    let query = {};

    if (req.user.role !== 'admin') {
      query = { user: req.user.id };
    }

    const orders = await Order.find(query)
                              .sort({ createdAt: -1 }) // الأحدث أولاً
                              .populate('items.productId') // تفاصيل المنتج
                              .populate('user', 'name email'); // تفاصيل صاحب الطلب (مفيدة للأدمن)

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // e.g., "Shipped", "Delivered"

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.orderStatus = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markOrderAsPaid = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.paymentStatus = "Paid";
    order.orderStatus = "Processing";     
    await order.save();

    res.json({ message: "Order marked as paid", order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};