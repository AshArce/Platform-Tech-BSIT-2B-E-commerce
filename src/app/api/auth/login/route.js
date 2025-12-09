// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectToDatabase();
    const { identifier, password } = await request.json();

    // 🔍 THIS IS THE SECRET SAUCE:
    // It checks Email OR Username OR Phone for the match
    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier }, // <--- THIS LINE MAKES IT WORK
        { phone: identifier }
      ]
    });

    // 1. Check if user exists
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // 2. Check Password
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl
      }
    });

  } catch (error) {
    return NextResponse.json({ message: 'Login error', error: error.message }, { status: 500 });
  }
}