"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { useState } from "react";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const idNumber = event.target.idNumber.value;

    // Depura el intento de inicio de sesión
    console.log("Attempting login with:", { email, idNumber });

    const result = await signIn("credentials", {
      email,
      idNumber,
      redirect: false,
      callbackUrl: "/profile",
    });

    // Verifica el resultado del inicio de sesión
    console.log("Login result:", result);

    if (!result || result.error) {
      setErrorMessage("Credenciales incorrectas. Intenta de nuevo.");
    } else {
      window.location.href = result.url;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 w-96 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        {errorMessage && (
          <div className="text-red-500 mb-4 text-center">{errorMessage}</div>
        )}
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <Input
              name="email"
              type="email"
              required
              fullWidth
              bordered
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">ID Number</label>
            <Input
              name="idNumber"
              type="text"
              required
              fullWidth
              bordered
              placeholder="Ingresa tu número de identificación"
            />
          </div>
          <Button type="submit" fullWidth className="bg-custom-pink">
            Iniciar Sesión
          </Button>
        </form>
      </Card>
    </div>
  );
}
