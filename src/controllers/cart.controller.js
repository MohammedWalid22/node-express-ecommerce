import Cart from "../models/Cart.js"; 
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
  
      const itemIndex = cart.items.findIndex(p => p.productId == productId);

      if (itemIndex > -1) {

        cart.items[itemIndex].quantity += quantity;
      } else {
  
        cart.items.push({ productId, quantity });
      }
      await cart.save();
    } else {
  
      cart = await Cart.create({
        user: userId,
        items: [{ productId, quantity }]
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.productId");
    if (!cart) return res.json([]);
        res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};