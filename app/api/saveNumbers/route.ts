import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function POST(request) {
    try {
      const body = await request.json();
      const { purchaseId, numbers } = body;
  
      // Verificar si el `purchaseId` es válido
      if (!purchaseId || typeof purchaseId !== 'number') {
        return NextResponse.json({ success: false, error: 'No se proporcionó un identificador de compra válido' }, { status: 400 });
      }
  
      // Crear los números seleccionados para la compra
      const createdNumbers = await prisma.selectedNumber.createMany({
        data: numbers.map(number => ({
          purchaseId,
          number
        })),
        skipDuplicates: true // Esto evita crear duplicados si se envía la misma solicitud varias veces
      });
  
      return NextResponse.json({ success: true, createdNumbers });
    } catch (error: unknown) {
      console.error('Error al guardar los números seleccionados:', error);
    
      // Comprobamos si error es realmente una instancia de Error
      if (error instanceof Error) {
        return NextResponse.json({ success: false, error: error.message });
      } else {
        // Manejo de casos donde error no es una instancia de Error
        return NextResponse.json({ success: false, error: 'An unexpected error occurred' });
      }
    }
  }
  