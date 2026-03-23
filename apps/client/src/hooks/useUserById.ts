'use client'

import { useQuery } from '@tanstack/react-query'
import { fetcher } from '../lib/api'
import { useSession } from 'next-auth/react'
import { User } from '@repo/types'

export const useUserById = (id?: string) => {
  const { data: session } = useSession()
  const token = session?.accessToken

  return useQuery<User>({
    queryKey: ['user', id],
    queryFn: () =>
      fetcher(
        `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/users/${id}`,
        token,
      ),
    enabled: !!id && !!token,
    retry: false,
    refetchOnWindowFocus: false,
  })
}
