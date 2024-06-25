import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const email = url.searchParams.get('email');

    if (!email) {
      return NextResponse.json({ message: 'Invalid email' });
    }

    const user = await prisma.usuario.findUnique({
      where: { email },
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: 'User not found' });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving profile data' });
  }
}
