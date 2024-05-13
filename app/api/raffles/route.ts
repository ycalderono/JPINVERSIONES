import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId'); // Obtener el ID del usuario desde la URL
  console.log('userId:', userId);
  
  if (!userId) {
    return NextResponse.json({ error: 'ID de usuario no proporcionado' }, { status: 400 });
  }

  try {
    // Consulta las compras del usuario autenticado
    const raffles = await prisma.purchase.findMany({
      where: { userId: parseInt(userId) }, // Filtra por ID de usuario
      include: {
        selectedNumbers: true, // Incluye los números seleccionados
        usuario: true, // Incluye detalles del usuario
      },
    });

    // Devuelve las rifas encontradas
    return NextResponse.json(raffles);
  } catch (error) {
    console.error('Error al obtener las rifas:', error);
    return NextResponse.json({ error: 'Error al obtener las rifas' }, { status: 500 });
  }
}
