// src/app/api/orders/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Order from '@/models/Order';
import Product from '@/models/Product'; // 1. Import Product Model

// ... GET function stays the same ...

// 2. POST: Create a New Order AND Update Inventory
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    // --- NEW INVENTORY LOGIC ---
    // Loop through every item in the cart
    for (const item of body.items) {
        // Find the product and update it
        // $inc means "increment" (add). We add -quantity to subtract.
        await Product.findOneAndUpdate(
            { id: item.productId }, 
            { 
                $inc: { 
                    stockCount: -item.quantity, // Subtract stock
                    soldCount: item.quantity    // Add to sold count
                } 
            }
        );
    }
    // ---------------------------

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
    console.error("Order Error:", error);
    return NextResponse.json({ message: 'Error creating order', error: error.message }, { status: 500 });
  }
}