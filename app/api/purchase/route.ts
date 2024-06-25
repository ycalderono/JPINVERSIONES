// api/purchase/route.ts

// pages/api/purchase.ts o app/api/purchase/route.ts (dependiendo de tu estructura)

import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, idNumber, raffleType, selectedNumbers, paymentMethod, totalAmount } = await req.json();

    // Buscar al usuario por email e idNumber
    const user = await prisma.usuario.findFirst({
      where: {
        email: email,
        idNumber: idNumber
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    // Crear la compra
    const purchase = await prisma.purchase.create({
      data: {
        userId: user.id,
        raffleType,
        paymentMethod,
        totalAmount,
        selectedNumbers: {
          create: selectedNumbers.map((number: string) => ({ number }))
        }
      },
    });

    return NextResponse.json({ success: true, purchase }, { status: 201 });
  } catch (error) {
    console.error('Error al procesar la compra:', error);
    return NextResponse.json({ error: "Error al procesar la compra" }, { status: 500 });
  }
}