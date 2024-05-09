// app/profile/page.js
"use client"; // Esto indica a Next.js que este archivo es un Client Component

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirigir al formulario de inicio de sesión si no hay una sesión activa.
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Mostrar un indicador de carga mientras se verifica la sesión.
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Mostrar el contenido del perfil si hay una sesión activa.
  if (session) {
    return (
      <div>
        <h1>Bienvenido, {session.user.name}</h1>
        <p>Correo electrónico: {session.user.email}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/auth/signin" })} // Redirige a la página de inicio de sesión
        >
          Cerrar Sesión
        </button>
      </div>
    );
  }

  // Si no hay sesión, el `useEffect` debería ya haber redirigido al inicio de sesión.
  return null;
}
