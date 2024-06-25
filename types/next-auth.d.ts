import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    idNumber: string
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      idNumber: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idNumber: string
  }
}