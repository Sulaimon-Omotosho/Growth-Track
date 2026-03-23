'use client'

import { useCurrentUser } from '@/src/hooks/useCurrentUser'
import { useUserByEmail } from '@/src/hooks/useUserByEmail'

const Test = () => {
  const { data: user, isLoading, error } = useCurrentUser()
  // console.log('user:', user)

  if (isLoading) return <p className='pt-40'>Loading...</p>
  if (error || !user) return <p className='pt-40'>User not found</p>

  return (
    <div className='pt-40 pb-20 text-center'>
      {/* <TestUser /> */}
      <p className='mt-6 text-xl'>DB User ID: {user?.id ?? 'null'}</p>
      <p className='mt-6 text-xl'>DB User AuthID: {user?.authId ?? 'null'}</p>
      <p className='mt-6 text-xl'>DB User Name: {user?.firstName ?? 'null'}</p>
    </div>
  )
}

export default Test
