// app/api/usuarios/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    // Extraer los datos enviados desde el cliente.
    const { fullName, email, idNumber, address, phone } = await request.json();

    // Verificar si el correo electrónico ya existe.
    const existingEmail = await prisma.usuario.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json({ success: false, error: "El correo electrónico ya está registrado." });
    }

    // Verificar si el número de cédula ya existe.
    const existingIdNumber = await prisma.usuario.findUnique({
      where: { idNumber },
    });

    if (existingIdNumber) {
      return NextResponse.json({ success: false, error: "El número de cédula ya está registrado." });
    }

    // Crear el nuevo usuario si no existen duplicados.
    const newUsuario = await prisma.usuario.create({
      data: {
        fullName,
        email,
        idNumber,
        address,
        phone,
      },
    });

    // Responder con éxito.
    return NextResponse.json({ success: true, usuario: newUsuario });

  } catch (error) {
    // Manejar los errores inesperados.
    return NextResponse.json({ success: false, error: error.message });
  }
}
