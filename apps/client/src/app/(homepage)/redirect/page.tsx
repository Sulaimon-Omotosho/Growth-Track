import { redirect } from 'next/navigation'
import { getCachedSession } from '@/src/lib/auth'

export default async function RedirectPage() {
  const session = await getCachedSession()

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

  redirect('/dashboard')
}
