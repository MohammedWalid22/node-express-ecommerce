import Stripe from "stripe";
import Order from "../models/Order.js"; 
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {

    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: order.totalPrice * 100, 
      currency: "usd",
      metadata: { orderId: order._id.toString() } });

    res.json({
      clientSecret: paymentIntent.client_secret,
      amount: order.totalPrice
    });

  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ message: error.message });
  }
};