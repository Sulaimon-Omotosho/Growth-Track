import { redirect } from 'next/navigation'
import { getCachedSession } from '@/src/lib/auth'

export default async function RedirectPage() {
  const session = await getCachedSession()

  if (!session) redirect('/sign-in')

  try {
    // const res = await fetch(
    //   `${process.env.USERS_SERVICE_URL}/users/byEmail?email=${encodeURIComponent(
    //     session.user.email!,
    //   )}`,
    const res = await fetch(`${process.env.USERS_SERVICE_URL}/users/me}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    })

    const user = await res.json()
    console.log('redirect:', user);
    

    if (!user.username) {
      redirect('/onboarding')
    }

    redirect('/dashboard')
  } catch (error) {
    console.error('Redirect error:', error)
    redirect('/sign-in')
  }
}
