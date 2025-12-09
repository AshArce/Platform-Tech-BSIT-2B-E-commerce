// src/app/api/auth/update/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import bcrypt from 'bcryptjs'; // 1. Import bcrypt

export async function PUT(request) {
  try {
    await connectToDatabase();
    const { id, name, email, phone, currentPassword, newPassword } = await request.json();

    const user = await User.findOne({ id: id });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // 2. Handle Password Change Securely
    if (newPassword) {
      // Check if current password is correct (Compare with Hash)
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return NextResponse.json({ message: 'Current password is incorrect' }, { status: 401 });
      }
      // Hash the NEW password
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    
    if (name) {
        user.avatarUrl = `https://via.placeholder.com/150?text=${name.charAt(0).toUpperCase()}`;
    }

    await user.save();

    return NextResponse.json({ 
      success: true, 
      message: 'Profile updated successfully', 
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatarUrl: user.avatarUrl
      } 
    });

  } catch (error) {
    return NextResponse.json({ message: 'Update failed', error: error.message }, { status: 500 });
  }
}