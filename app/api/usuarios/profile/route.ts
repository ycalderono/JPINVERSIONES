import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = parseInt(url.searchParams.get('id') || '0', 10);

    if (!id) {
      return NextResponse.json({ message: 'Invalid user ID' });
    }

    const user = await prisma.usuario.findUnique({
      where: { id },
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
