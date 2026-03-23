import NextAuth from 'next-auth'

import z from 'zod'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    refreshToken?: string
    accessTokenExpiresIn?: any
    refreshTokenExpiresIn?: any
    error?: string
    tokenVersion?: any
    user?: {
      id: string
      email?: string | null
      role: string
      accessToken: string
      refreshToken: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: string
    accessToken: string
    refreshToken: string
    accessTokenExpiresIn: any
    refreshTokenExpiresIn: any
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string
    role?: string
    accessToken?: string
    refreshToken?: string
    accessTokenExpires?: number
    refreshTokenExpires?: number
    sessionStart?: number
    tokenVersion?: number
    error?: string
  }
}

export const UserFormSchema = z.object({
  fistName: z
    .string({ message: 'First Name is required!' })
    .min(2, { message: 'First Name must be at least 2 characters!' })
    .max(50),
  lastName: z
    .string({ message: 'Last Name is required!' })
    .min(2, { message: 'Last Name must be at least 2 characters!' })
    .max(50),
  username: z
    .string({ message: 'Username is required!' })
    .min(2, { message: 'Username must be at least 2 characters!' })
    .max(50),
  email: z.email({ message: 'Email address is required!' }),
  password: z
    .string({ message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' })
    .max(50),
})
