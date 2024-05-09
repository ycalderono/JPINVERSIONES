// lib/authOptions.js
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        idNumber: { label: "ID Number", type: "text" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.idNumber) {
          throw new Error("Faltan las credenciales.");
        }

        const user = await prisma.usuario.findFirst({
          where: {
            email: credentials.email,
            idNumber: credentials.idNumber,
          },
        });

        if (user) {
          return { id: user.id, name: user.fullName, email: user.email };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // Asegúrate de que esta variable esté presente en `.env`
};
