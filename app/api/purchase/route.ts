// api/purchase/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, raffleType, selectedNumbers, paymentMethod, totalAmount } = body;

    // Verificar si el `userId` es válido
    if (!userId || typeof userId !== 'number') {
      return NextResponse.json({ success: false, error: 'No se proporcionó un identificador de usuario válido' }, { status: 400 });
    }

    // Crear la nueva compra
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        raffleType,
        selectedNumbers: {
          create: selectedNumbers.map((num) => ({ number: num })),
        },
        paymentMethod,
        totalAmount,
      },
    });

    return NextResponse.json({ success: true, purchase });
  } catch (error: unknown) {
    console.error('Error al guardar la compra:', error);
  
    if (error instanceof Error) {
      return NextResponse.json({ success: false, error: error.message });
    } else {
      // Puedes decidir cómo manejar los casos donde el error no es una instancia de Error
      return NextResponse.json({ success: false, error: 'An unexpected error occurred' });
    }
  }
  
}
