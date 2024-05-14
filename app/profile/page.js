"use client"; // Esto indica a Next.js que este archivo es un Client Component

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import RifasList from "./components/RifasList";
import UserProfileCard from "./components/UserProfileCard";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Agregar console.log para verificar el estado de la sesión y la redirección
  useEffect(() => {
    console.log("Session status:", status);
    if (status === "unauthenticated") {
      console.log("No session, redirecting to sign-in page.");
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Mostrar un indicador de carga mientras se verifica la sesión.
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Mostrar el contenido del perfil si hay una sesión activa.
  if (session) {
    console.log("Session data:", session);
    return (
      <div>
        <h1>Bienvenido, {session.user.name}</h1>
        <p>Correo electrónico: {session.user.email}</p>
        <UserProfileCard />
        <RifasList />
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
