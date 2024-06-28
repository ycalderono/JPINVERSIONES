// app/api/upload-payment-proof/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";
import { uploadToS3 } from '@/utils/s3';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const purchaseId = parseInt(formData.get('purchaseId') as string);

    if (!file || !purchaseId) {
      return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileName = `${Date.now()}-${file.name}`;
    const fileUrl = await uploadToS3(Buffer.from(fileBuffer), fileName);

    const paymentProof = await prisma.paymentProof.create({
      data: {
        purchaseId,
        fileUrl,
      },
    });

    await prisma.purchase.update({
      where: { id: purchaseId },
      data: { paymentStatus: 'proof_uploaded' },
    });

    return NextResponse.json({ success: true, paymentProof }, { status: 201 });
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    return NextResponse.json({ error: "Error al procesar el archivo" }, { status: 500 });
  }
}