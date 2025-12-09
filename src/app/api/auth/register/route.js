// src/app/api/auth/register/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await connectToDatabase();
    // 1. Get username from request
    const { fullName, email, phone, password, username } = await request.json();

    // 2. Check if EMAIL exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    // 3. Check if USERNAME exists (New Check)
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return NextResponse.json({ message: 'Username is already taken' }, { status: 400 });
    }

    // 4. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      id: Date.now(),
      name: fullName,
      username: username, 
      email,
      phone,
      password: hashedPassword,
      role: 'Foodie Member',
      avatarUrl: `https://via.placeholder.com/150?text=${fullName.charAt(0).toUpperCase()}`
    });

    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully', user: newUser }, { status: 201 });

  } catch (error) {
    return NextResponse.json({ message: 'Registration failed', error: error.message }, { status: 500 });
  }
}