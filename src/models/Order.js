import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    {
      productId: mongoose.Schema.Types.ObjectId,
      quantity: Number
    }
  ],
  totalPrice: Number,
  paymentStatus: String,
  orderStatus: { type: String, default: 'Processing' }
});

export default mongoose.model('Order', orderSchema);
