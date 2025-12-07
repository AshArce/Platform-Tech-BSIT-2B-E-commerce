// src/app/api/seed/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import bcrypt from 'bcryptjs'; // 1. Import bcrypt

// Import Models
import Product from '@/models/Product';
import User from '@/models/User';
import Order from '@/models/Order';

// Import Source Data
import { products } from '@/data/products';
import { users } from '@/data/users';
// import { orders } from '@/data/orders'; 

export async function GET() {
  try {
    await connectToDatabase();

    // 1. CLEAR existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    await Order.deleteMany({});

    // 2. INSERT Products (No changes needed)
    await Product.insertMany(products);

    // 3. HASH Passwords for Users
    const hashedUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword // Replace plain text with hash
      };
    }));

    await User.insertMany(hashedUsers);
    
    // Optional: Seed orders if you want history immediately
    // await Order.insertMany(orders); 

    return NextResponse.json({ 
      status: 'success', 
      message: 'Database Seeded with Secure Users! 🌱',
      counts: {
        products: products.length,
        users: users.length,
      }
    });

  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Seeding failed', 
      error: error.message 
    }, { status: 500 });
  }
}