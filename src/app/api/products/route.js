// src/app/api/products/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db'; 
import Product from '@/models/Product';       

// 1. GET: Fetch ALL products
export async function GET() {
  try {
    await connectToDatabase();
    // Sort by ID to keep order stable
    const products = await Product.find({}).sort({ id: 1 });
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products', error }, { status: 500 });
  }
}

// 2. POST: Add a NEW product
export async function POST(request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    if (!body.name || !body.price) {
      return NextResponse.json({ message: 'Name and Price are required' }, { status: 400 });
    }

    const lastProduct = await Product.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const newProduct = new Product({
      ...body,
      id: newId
    });

    await newProduct.save();

    return NextResponse.json({ message: 'Product Created', product: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding product', error }, { status: 500 });
  }
}