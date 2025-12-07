// src/app/api/auth/login/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs'; // 1. Import bcrypt

export async function POST(request) {
  try {
    await connectToDatabase();
    const { identifier, password } = await request.json();

    const user = await User.findOne({
      $or: [
        { email: identifier },
        { username: identifier },
        { phone: identifier }
      ]
    });

    // 2. Use bcrypt to compare the plain password with the DB hash
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatarUrl: user.avatarUrl
      }
    });

  } catch (error) {
    return NextResponse.json({ message: 'Login error', error: error.message }, { status: 500 });
  }
}