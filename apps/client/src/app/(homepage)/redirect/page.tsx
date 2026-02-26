// app/redirect/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../api/auth/[...nextauth]/route'

export default async function RedirectPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/sign-in')

  // fetch user profile from user-service
  const res = await fetch(`http://localhost:8001/users/${session.user.email}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  })

  const user = await res.json()

  if (!user.username) {
    redirect('/onboarding')
  }

  redirect('/user')
}
