// app/protected-page/page.js
import { useSession, signIn } from "next-auth/react";

export default function ProtectedPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    signIn(); // Redirige al inicio de sesión
    return null;
  }

  return <div>Welcome, {session.user.name}!</div>;
}
