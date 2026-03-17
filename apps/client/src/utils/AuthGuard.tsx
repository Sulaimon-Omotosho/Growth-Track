'use client'

import { signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()

  useEffect(() => {
    if (session.data?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/sign-in' })
    }

    if (session.status === 'authenticated' && !session.data?.refreshToken) {
      signOut({ callbackUrl: '/sign-in' })
    }
  }, [session])
  return <>{children}</>
}

export default AuthGuard
