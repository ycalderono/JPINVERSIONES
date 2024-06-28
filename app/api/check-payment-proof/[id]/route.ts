// app/api/check-payment-proof/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    const paymentProof = await prisma.paymentProof.findUnique({
      where: { purchaseId: id },
    });

    return NextResponse.json({ isUploaded: !!paymentProof }, { status: 200 });
  } catch (error) {
    console.error('Error al verificar el comprobante:', error);
    return NextResponse.json({ error: "Error al verificar el comprobante" }, { status: 500 });
  }
}