// pages/api/wallpaper-purchase.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, idNumber, wallpaperTitle, paymentMethod, totalAmount } = await req.json();

    const user = await prisma.usuario.findFirst({
      where: {
        email: email,
        idNumber: idNumber
      }
    });

    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const purchaseData = {
      userId: user.id,
      raffleType: 'Wallpaper',
      paymentMethod,
      totalAmount,
      isPromotion: false,
      wallpaperTitle,
    };

    const purchase = await prisma.purchase.create({
      data: purchaseData,
    });

    return NextResponse.json({ success: true, purchase }, { status: 201 });
  } catch (error) {
    console.error('Error al procesar la compra del wallpaper:', error);
    return NextResponse.json({ error: "Error al procesar la compra del wallpaper" }, { status: 500 });
  }
}