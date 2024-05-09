// app/api/check-email/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";// Ajusta según tu estructura de proyecto

const prisma = new PrismaClient();

export async function GET(request) {
  // Obtener los parámetros de la URL
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    console.log('Falta el parámetro de correo electrónico');
    return NextResponse.json({ exists: false }, { status: 400 });
  }

  console.log(`Verificando correo: ${email}`);

  // Consulta en la base de datos si el correo existe
  try {
    const existingUser = await prisma.Usuario.findUnique({
      where: { email },
    });

    console.log(`Usuario encontrado: ${Boolean(existingUser)}`);
    // Retorna si el correo ya existe
    return NextResponse.json({ exists: Boolean(existingUser) }, { status: 200 });
  } catch (error) {
    console.error('Error al acceder a la base de datos', error);
    return NextResponse.json({ exists: false }, { status: 500 });
  }
}
