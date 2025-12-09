// src/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, 
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  imageUrl: { type: String },
  
  stockCount: { type: Number, default: 50 },
  soldCount: { type: Number, default: 0 },
  
  // TIMING ATTRIBUTES (in Seconds)
  cookingTime: { type: Number, default: 5 },   // Default 5 seconds
  deliveryTime: { type: Number, default: 15 }, // Default 15 seconds

  inStock: { type: Boolean, default: true }, 
  size: { type: [String], default: [] },
  
  // Feature Flags
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isTopPick: { type: Boolean, default: false },
  isHot: { type: Boolean, default: false },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);