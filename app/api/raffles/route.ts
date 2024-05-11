// app/api/raffles/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Ruta para obtener todas las rifas (compras)
export async function GET() {
  try {
    // Consulta todas las compras (rifas)
    const raffles = await prisma.purchase.findMany({
      include: {
        selectedNumbers: true, // Incluye la relación con los números seleccionados
        usuario: true, // Incluye información sobre el usuario si lo necesitas
      },
    });

    // Devuelve la respuesta en formato JSON
    return NextResponse.json(raffles);
  } catch (error) {
    console.error('Error al obtener las rifas:', error);
    return NextResponse.json({ error: 'Error al obtener las rifas' }, { status: 500 });
  }
}
