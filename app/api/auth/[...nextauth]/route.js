import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions = {
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
        console.log("Received credentials:", credentials);

        if (!credentials?.email || !credentials.idNumber) {
          throw new Error("Faltan las credenciales.");
        }

        const user = await prisma.Usuario.findFirst({
          where: {
            email: credentials.email,
            idNumber: credentials.idNumber,
          },
        });

        console.log("User found:", user);

        if (user) {
          return { id: user.id, name: user.fullName, email: user.email };
        } else {
          console.log("No user found.");
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 día de duración
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Añadir `id` al token si el usuario inicia sesión
      if (user) {
        token.sub = user.id; // Asegúrate de que `user.id` existe y se asigna a `sub`
      }
      return token;
    },
    async session({ session, token }) {
      // Añade el `id` desde el token a la sesión
      session.user.id = token.sub; // Aquí asumimos que `session.user` ya está definido
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


