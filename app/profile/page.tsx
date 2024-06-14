"use client"; // Esto indica a Next.js que este archivo es un Client Component

import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";
import RifasList from "./components/RifasList";
import UserProfileCard from "./components/UserProfileCard";
import { Card } from "@nextui-org/card";
import {Tabs, Tab} from "@nextui-org/tabs";
import { Image } from "@nextui-org/image";
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

        <div className="flex flex-col items-center justify-center pb-8">
          Perfil de usuario
        </div>

        <div className="flex flex-col items-center justify-center pb-8">
          <Avatar className="w-20 h-20 text-large"></Avatar>
        </div>

        <div className="flex flex-col items-center justify-center pb-8">
          <Card className="w-full h-ful items-center justify-center">
            <p  className="text-md ">
            {session.user.name}
            </p>
            <p  className="text-md ">
            {session.user.email}
            </p>
          </Card>
        </div>

        <div className="flex flex-col items-center justify-center pb-8">
          <Tabs>
            <Tab >
              Tus fondos de pantalla
            </Tab>
            <Tab >
              Tus transacciones
            </Tab>
          </Tabs>
        </div>

        <div className="flex flex-row justify-center">
          <div className="flex flex-col items-center">
            <Card className="w-[191px] h-[264px] mx-2 mb-4">
              <Image
                alt="Card background"
                className="w-[191px] h-[264px] object-cover rounded-lg"
                src="https://nextui.org/images/hero-card-complete.jpeg"
              />
            </Card>
            <Card className="w-[191px] h-[264px] mx-2 mb-4">
              <Image
                alt="Card background"
                className="w-[191px] h-[264px] object-cover rounded-lg"
                src="https://nextui.org/images/hero-card-complete.jpeg"
              />
            </Card>
          </div>
          <div className="flex flex-col items-center">
            <Card className="w-[191px] h-[264px] mx-2 mb-4">
              <Image
                alt="Card background"
                className="w-[191px] h-[264px] object-cover rounded-lg "
                src="https://nextui.org/images/hero-card-complete.jpeg"
              />
            </Card>
            <Card className="w-[191px] h-[264px] mx-2 mb-4">
              <Image
                alt="Card background"
                className="object-cover w-[191px] h-[264px] rounded-lg "
                src="https://nextui.org/images/hero-card-complete.jpeg"
              />
            </Card>
          </div>
        </div>

      </div>
    );
  }

  // Si no hay sesión, el `useEffect` debería ya haber redirigido al inicio de sesión.
  return null;
}
