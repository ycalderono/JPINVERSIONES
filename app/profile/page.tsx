"use client"; // Esto indica a Next.js que este archivo es un Client Component

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Card } from "@nextui-org/card";
import { Tabs, Tab } from "@nextui-org/tabs";
import dynamic from "next/dynamic";
import RifasList from "./components/RifasList";
import UserProfileCard from "./components/UserProfileCard";
import { Image } from "@nextui-org/image";

// Definición del tipo Key
type Key = string | number;

// Cargar TransactionsAccordion dinámicamente
const TransactionsAccordion = dynamic(() => import("./components/TransactionsAccordion"), {
  ssr: false,
});

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [selectedTab, setSelectedTab] = useState<Key>("wallpapers");

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

  // Manejar el cambio de pestañas
  const handleTabChange = (key: Key) => {
    setSelectedTab(key);
  };

  // Mostrar el contenido del perfil si hay una sesión activa.
  if (session) {
    console.log("Session data:", session);
    return (
      <div>
        <div className="flex flex-col items-center justify-center pb-8">
          Perfil de usuario
        </div>

        <div className="flex flex-col items-center justify-center pb-8">
          <Avatar className="w-20 h-20 text-large" />
        </div>

        <div className="flex flex-col items-center justify-center pb-8">
          <Card className="w-full h-full items-center justify-center">
            <p className="text-md">
              {session.user.name}
            </p>
            <p className="text-md">
              {session.user.email}
            </p>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center pb-8 w-[400px]">
          <Tabs selectedKey={selectedTab} onSelectionChange={handleTabChange} aria-label="Profile Tabs">
            <Tab key="wallpapers" title="Tus fondos de pantalla">
              <div>Contenido de fondos de pantalla</div>
            </Tab>
            <Tab key="transactions" title="Tus transacciones">
              <TransactionsAccordion />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }

  // Si no hay sesión, el `useEffect` debería ya haber redirigido al inicio de sesión.
  return null;
}
