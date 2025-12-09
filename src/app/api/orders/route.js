// src/app/api/orders/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product'; // 1. Import Product Model to manage inventory

// 1. GET: Fetch Orders (Filtered by User or All)
export async function GET(request) {
  try {
    await connectToDatabase();
    
    // Check for query params (e.g., /api/orders?userId=123)
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = {};
    if (userId) {
      query = { userId: parseInt(userId) }; // Filter by user if ID provided
    }
    
    // Sort by newest first
    const orders = await Order.find(query).sort({ date: -1 });
    return NextResponse.json(orders);

  } catch (error) {
    return NextResponse.json({ message: 'Error fetching orders', error }, { status: 500 });
  }
}

// 2. POST: Create a New Order AND Update Inventory
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // --- INVENTORY UPDATE LOGIC ---
    // Loop through every item in the cart to update the Product database
    if (body.items && body.items.length > 0) {
        for (const item of body.items) {
            // Ensure we have a productId to search with
            if (item.productId) {
                await Product.findOneAndUpdate(
                    { id: item.productId }, 
                    { 
                        $inc: { 
                            stockCount: -item.quantity, // Deduct stock
                            soldCount: item.quantity    // Increase sales count
                        } 
                    }
                );
            }
        }
    }
    // ------------------------------

    // Generate a readable ID (e.g., ORD-8273)
    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder = new Order({
      id: orderId,
      userId: body.userId,
      total: body.total,
      status: 'Cooking', // Default status
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