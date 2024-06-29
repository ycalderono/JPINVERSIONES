"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input"; 
import { Button } from "@nextui-org/button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/profile');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        idNumber,
      });

      if (result?.error) {
        setError('Credenciales inválidas. Por favor, intenta de nuevo.');
      } else {
        router.push('/profile');
      }
    } catch (error) {
      setError('Ocurrió un error durante el inicio de sesión. Por favor, intenta de nuevo.');
    }
  };

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  if (status === 'authenticated') {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-center pb-0 pt-6">
          <h2 className="text-2xl font-bold">Iniciar sesión</h2>
        </CardHeader>
        <CardBody className="overflow-hidden">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              label="Correo electrónico"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              type="text"
              label="Número de identificación"
              placeholder="Ingresa tu número de identificación"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
            />
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <Button 
              color="primary" 
              type="submit"
              style={{ 
                backgroundColor: '#fe41f0',
                color: 'white',
              }}
            >
              Iniciar sesión
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}