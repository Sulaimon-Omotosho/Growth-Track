'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { User } from '@repo/types'
import { fetcher } from '../lib/api'

export const useCurrentUser = () => {
  const { data: session } = useSession()
  const token = session?.accessToken
  // console.log(session)

  return useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: () =>
      fetcher(`${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/users/me`, token),
    // retry: false,
    // refetchOnWindowFocus: false,
    enabled: !!token,
  })
}

// const { data: user } = useUserById('998dcd79-40d4-4196-9584-169597f95f56')

// const { data: user } = useUserByEmail('test@example.com')
