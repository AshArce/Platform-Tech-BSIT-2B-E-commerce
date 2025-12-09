// src/app/api/orders/[id]/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';

// 1. GET: Fetch a Single Order
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    
    // 🚨 Next.js 15 Requirement: Await params
    const { id } = await params;

    const order = await Order.findOne({ id: id });

    if (!order) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);

  } catch (error) {
    return NextResponse.json({ message: 'Error fetching order', error: error.message }, { status: 500 });
  }
}

// 2. PUT: Update Order Status (This is what triggers the 405 if missing)
export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    
    // 🚨 Next.js 15 Requirement: Await params
    const { id } = await params;
    
    // Get the new status from the frontend
    const { status } = await request.json();

    console.log(`Updating Order ${id} to ${status}...`);

    const updatedOrder = await Order.findOneAndUpdate(
      { id: id }, 
      { status: status }, 
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ message: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Order Status Updated', order: updatedOrder });

  } catch (error) {
    console.error('Update Error:', error);
    return NextResponse.json({ message: 'Error updating order', error: error.message }, { status: 500 });
  }
}