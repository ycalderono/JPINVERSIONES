'use client';

import { useSession } from "next-auth/react"
import type { Session } from "next-auth"

export function useCustomSession() {
  const { data: session, status, update } = useSession()
  return { 
    session: session as Session & { user: { idNumber: string } }, 
    status, 
    update 
  }
}