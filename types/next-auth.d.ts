// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * Modelo de usuario extendido que incluye el ID del usuario,
   * que no está incluido por defecto en NextAuth.
   */
  interface User {
    id: string;
  }

  /**
   * Sobrescribir la sesión de NextAuth para incluir el tipo de usuario extendido.
   */
  interface Session {
    user: User;
  }
}
