// src/app/api/products/[id]/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';     
import Product from '@/models/Product';    

// 1. GET: Fetch a SINGLE product
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params; // Await params for Next.js 15
    
    const product = await Product.findOne({ id: parseInt(id) });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching product', error }, { status: 500 });
  }
}

// 2. PUT: Update a SINGLE product
export async function PUT(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const body = await request.json();

    const updatedProduct = await Product.findOneAndUpdate(
      { id: parseInt(id) }, 
      body,                 
      { new: true }         
    );

    if (!updatedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product Updated', product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating product', error }, { status: 500 });
  }
}

// 3. DELETE: Remove a SINGLE product
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;

    const deletedProduct = await Product.findOneAndDelete({ id: parseInt(id) });

    if (!deletedProduct) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product Deleted', id });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting product', error: error.message }, { status: 500 });
  }
}