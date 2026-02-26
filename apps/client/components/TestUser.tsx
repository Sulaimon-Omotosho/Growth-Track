'use client'

import { useSession } from 'next-auth/react'

// const { data: session } = useSession()

// await fetch(`${process.env.NEXT_PUBLIC_USERS_SERVICE_URL}/users/${user.id}`, {
//   method: 'PATCH',
//   headers: {
//     Authorization: `Bearer ${session?.accessToken}`,
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })

const TestUser = () => {
  const { data: session, status } = useSession()
  if (status === 'loading') return <p>Loading...</p>
  if (!session) return <p>Not logged in</p>

  return (
    <div className='flex flex-col text-center text-3xl font-bold'>
      <p>User ID (session): {session.user.id}</p>
      <p>Email: {session.user.email}</p>
      <p>Role: {session.user.role}</p>
      <p className='break-all text-sm mt-4'>Token: {session.accessToken}</p>
    </div>
  )
}

export default TestUser
