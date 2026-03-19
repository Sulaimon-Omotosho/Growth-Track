import { redirect } from 'next/navigation'
import Onboarding from '@/src/components/forms/Onboarding'
import { getCachedSession } from '@/src/lib/auth'

export default async function OnboardingPage() {
  const session = await getCachedSession()

  if (!session) redirect('/sign-in')

  const res = await fetch(`http://localhost:8001/users/${session.user.email}`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }

  const user = await res.json()

  if (user.username) {
    redirect('/user')
  }

  return (
    <section className='p-4 w-full h-[calc(100vh-64px)]  md:h-[calc(100vh-9rem)] flex items-center justify-center rounded-md'>
      <section className='md:mt-15 shadow-2xl dark:shadow-slate-900 rounded-md flex flex-col md:h-[85%] lg:h-[70%] xl:h-[75%] gap-4 px-6 py-6'>
        <h1 className='font-bold text-xl mt-4 text-center'>
          Complete your profile
        </h1>
        <Onboarding user={user} accessToken={session.accessToken!} />
      </section>
    </section>
  )
}
