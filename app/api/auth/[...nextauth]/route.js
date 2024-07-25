// app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth'; // Ensure this path is correct

// Handle GET and POST requests
export async function GET(req) {
  return NextAuth(req, authOptions);
}

export async function POST(req) {
  return NextAuth(req, authOptions);
}
