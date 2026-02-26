'use client'

import { User } from '@repo/types'
import { createContext, useContext } from 'react'

type UserContextType = {
  user: User
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({
  user,
  children,
}: {
  user: User
  children: React.ReactNode
}) {
  return (
    <UserContext.Provider value={{ user }}>{children} </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be within UserProvider')
  return ctx
}
