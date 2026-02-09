import express from 'express';
import Product from '../models/Product.js';
import { protect, adminOnly } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Admin: Create product
router.post('/', protect, adminOnly, async (req, res) => {
  const product = await Product.create(req.body);
  res.json(product);
});

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

export default router;
