import express from 'express';
import { addToCart, getCart } from '../controllers/cart.controller.js'; // 1. استدعاء الدوال من الكنترولر
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', protect, addToCart); 
router.get('/', protect, getCart);

export default router;