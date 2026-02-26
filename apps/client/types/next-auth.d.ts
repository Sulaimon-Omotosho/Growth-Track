import NextAuth from 'next-auth'

import z from 'zod'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    error?: string
    user: {
      id: string
      email?: string | null
      role: string
      accessToken: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    role: string
    accessToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    role?: string
    accessToken?: string
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
