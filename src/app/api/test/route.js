// src/app/api/test/route.js
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/db'; // Import the bridge we built

export async function GET() {
  try {
    await connectToDatabase();
    
    return NextResponse.json({ 
      status: 'success', 
      message: 'Connected na sa DB 8080' 
    });

  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      message: 'Database connection failed.', 
      error: error.message 
    }, { status: 500 });
  }
}