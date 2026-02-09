import express from 'express';
import { createOrder, getOrders, updateOrderStatus, markOrderAsPaid } from '../controllers/order.controller.js'; 
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, createOrder);
router.get('/', protect, getOrders);
router.put('/:orderId/status', protect, adminOnly, updateOrderStatus);

router.put('/:orderId/pay', protect, markOrderAsPaid);

export default router;