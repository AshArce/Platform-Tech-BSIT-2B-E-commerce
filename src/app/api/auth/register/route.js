// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs'; // 1. Import bcrypt

export async function POST(request) {
  try {
    await connectToDatabase();
    const { fullName, email, phone, password } = await request.json();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // 2. Hash the password (10 rounds of salting)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      id: Date.now(),
      name: fullName,
      username: email.split('@')[0],
      email,
      phone,
      password: hashedPassword, // 3. Save the HASH, not the plain text
      role: 'Foodie Member',
      avatarUrl: `https://via.placeholder.com/150?text=${fullName.charAt(0).toUpperCase()}`
    });

    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: 'Registration failed', error: error.message }, { status: 500 });
  }
}