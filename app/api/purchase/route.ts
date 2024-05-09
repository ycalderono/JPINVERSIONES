// app/api/purchase/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const data = await request.json();
    const { fullName, email, address, city, ticketType } = data;

    // Guarda los datos en la base de datos
    const purchase = await prisma.purchase.create({
        data: {
            fullName,
            email,
            address,
            city,
            ticketType,
        },
    });

    return NextResponse.json({ success: true, purchase });
}
