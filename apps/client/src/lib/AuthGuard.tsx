'use client'

import { useSession, signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (session?.error === 'RefreshTokenExpired') {
      signOut({ callbackUrl: '/sign-in' })
    }
  }, [session])

  if (status === 'loading') return null

  return <>{children}</>
}
