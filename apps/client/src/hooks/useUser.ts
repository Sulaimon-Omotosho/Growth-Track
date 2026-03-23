'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

export const useUser = () => {
  const { data: session } = useSession()
  console.log('token:', session)

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!session?.accessToken) {
        throw new Error('No token')
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      )

      if (!res.ok) {
        throw new Error('Failed to fetch user')
      }

      return res.json()
    },
    enabled: !!session?.accessToken,

    // retry: false,
    // refetchOnWindowFocus: false,
  })
}
