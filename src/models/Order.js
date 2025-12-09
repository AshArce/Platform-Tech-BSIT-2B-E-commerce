// src/models/Order.js
import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  productId: { type: Number }, // Link to Product ID (Important for inventory)
  name: String,
  quantity: Number,
  price: Number,
  size: String, 
  selectedOptions: {
    utensils: { type: Boolean, default: false },
    straw: { type: Boolean, default: false },
    hotSauce: { type: Boolean, default: false }
  }
});

const OrderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // e.g. "ORD-1234"
  userId: { type: Number, required: true }, 
  date: { type: String, default: () => new Date().toLocaleDateString() },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    default: 'Cooking',
    enum: ['Cooking', 'Waiting for Courier', 'On the Way', 'Delivered', 'Refund Requested', 'Refunded', 'Cancelled']
  },
  items: [OrderItemSchema]
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);