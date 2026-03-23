'use client'

import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../lib/api'
import { useSession } from 'next-auth/react'
import { User } from '@repo/types'

export const useUserByEmail = (email?: string) => {
  const { data: session } = useSession()
  const token = session?.accessToken

  return useQuery<User>({
    queryKey: ['userByEmail', email],
    queryFn: () =>
      fetcher(
        `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/users/byEmail?email=${encodeURIComponent(email!)}`,
        // `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/users/byEmail?email=${email}`,
        token,
      ),
    enabled: !!email,
    // enabled: !!email && !!token,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
