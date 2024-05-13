'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

function ProtectedPage() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      // Redirigir o mostrar mensaje de error si no hay sesión
    }
  }, [session]);

  if (!session) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Bienvenido, {session.user.name}</h1>
      {/* El contenido protegido aquí */}
    </div>
  );
}

export default ProtectedPage;
