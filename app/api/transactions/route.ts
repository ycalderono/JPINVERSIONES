import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const purchases = await prisma.purchase.findMany({
      where: {
        usuario: {
          email: session.user.email
        }
      },
      include: {
        selectedNumbers: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(purchases);
  } catch (error) {
    console.error("Error al obtener las transacciones:", error);
    return NextResponse.json({ error: "Error al obtener las transacciones" }, { status: 500 });
  }
}