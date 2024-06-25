'use client';

import { useCustomSession } from "./useCustomSession"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function useAuth() {
  const { session, status } = useCustomSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login')
    }
  }, [status, router])

  return { 
    isAuthenticated: status === "authenticated", 
    isLoading: status === "loading",
    user: session?.user
  }
}