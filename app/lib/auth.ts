import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          idNumber: { label: "Número de Identificación", type: "text" },
        },
        async authorize(credentials) {
          if (!credentials?.email || !credentials?.idNumber) {
            return null
          }
  
          const user = await prisma.usuario.findFirst({
            where: {
              email: credentials.email,
              idNumber: credentials.idNumber
            }
          })
  
          if (!user) {
            return null
          }
  
          return { 
            id: user.id.toString(), 
            email: user.email, 
            name: user.fullName,
            idNumber: user.idNumber
          }
        }
      })
    ],
    session: {
      strategy: "jwt"
    },
    pages: {
      signIn: "/login"
    },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.idNumber = user.idNumber
        }
        return token
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.idNumber = token.idNumber
        }
        return session
      }
    }
  }