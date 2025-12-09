// src/app/api/orders/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product';

// 1. GET: Fetch Orders
export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = {};
    if (userId) {
      query = { userId: parseInt(userId) };
    }
    
    const orders = await Order.find(query).sort({ date: -1 });
    return NextResponse.json(orders);

  } catch (error) {
    return NextResponse.json({ message: 'Error fetching orders', error }, { status: 500 });
  }
}

// 2. POST: Create Order and Deduct Stock
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // Loop through items to update stock
    if (body.items && body.items.length > 0) {
        for (const item of body.items) {
            if (item.productId) {
                await Product.findOneAndUpdate(
                    { id: item.productId }, 
                    { 
                        $inc: { 
                            stockCount: -item.quantity, 
                            soldCount: item.quantity
                        } 
                    }
                );
            }
        }
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = new Order({
      id: orderId,
      userId: body.userId,
      total: body.total,
      status: 'Cooking',
      items: body.items,
      date: new Date().toLocaleDateString()
    });

    await newOrder.save();

    return NextResponse.json({ message: 'Order Placed', order: newOrder }, { status: 201 });

  } catch (error) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ message: 'Error creating order', error: error.message }, { status: 500 });
  }
}