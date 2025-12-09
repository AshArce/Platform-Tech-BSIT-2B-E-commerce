// src/models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, 
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true, sparse: true }, 
  password: { type: String, required: true }, 
  phone: { type: String },
  role: { type: String, default: 'Foodie Member' }, 
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);