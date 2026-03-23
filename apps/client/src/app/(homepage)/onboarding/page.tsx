'use client'

import { redirect } from 'next/navigation'
import Onboarding from '@/src/components/forms/Onboarding'
import { useCurrentUser } from '@/src/hooks/useCurrentUser'

export default function OnboardingPage() {
  const { data: user, isLoading, error } = useCurrentUser()

  if (isLoading) return <p className='pt-40'>Loading...</p>
  if (error || !user) return <p className='pt-40'>User not found</p>

  if (user!.username) {
    redirect('/dashboard')
  }

  return (
    <section className='p-4 w-full h-[calc(100vh-64px)]  md:h-[calc(100vh-9rem)] flex items-center justify-center rounded-md'>
      <section className='md:mt-15 shadow-2xl dark:shadow-slate-900 rounded-md flex flex-col md:h-[85%] lg:h-[70%] xl:h-[75%] gap-4 px-6 py-6'>
        <h1 className='font-bold text-xl mt-4 text-center'>
          Complete your profile
        </h1>
        <Onboarding user={user!} />
      </section>
    </section>
  )
}
