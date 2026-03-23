'use client'

import { User } from '@repo/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { fetcher } from '../lib/api'

export const useUpdateProfile = () => {
  const { data: session } = useSession()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      return fetcher(
        `${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/users/me`,
        session?.accessToken,
        {
          method: 'PATCH',
          body: JSON.stringify({
            ...data,
            dob: data.dob ? new Date(data.dob).toISOString() : undefined,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    },
  })
}
