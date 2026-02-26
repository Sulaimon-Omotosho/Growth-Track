import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../app/api/auth/[...nextauth]/route'

const usersUrl = process.env.USERS_SERVICE_URL!

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  // console.log('accessToken in server:', session?.accessToken)

  // if (!session?.accessToken) {
  //   redirect('/auth/logout')
  // }

  const res = await fetch(`${usersUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${session!.accessToken}`,
    },
    cache: 'no-store',
  })

  if (res.status === 401) {
    redirect('/auth/logout')
  }

  if (!res.ok) {
    throw new Error('Failed to fetch current user')
  }

  return res.json()
}
