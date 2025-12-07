// src/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // Simple numeric ID
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // In a real app, this would be hashed!
  phone: { type: String },
  role: { type: String, default: 'Foodie Member' }, // 'Foodie Member' or 'System Administrator'
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);