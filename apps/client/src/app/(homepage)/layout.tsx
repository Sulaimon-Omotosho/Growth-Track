import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { User } from '@repo/types'
// import './globals.css'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  let user: User | null = null

  if (session?.accessToken) {
    const res = await fetch(`${process.env.USERS_SERVICE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      cache: 'no-store',
    })

    if (res.ok) {
      user = await res.json()
    } else {
      throw new Error('Failed to load dashboard')
    }
  }

  return (
    <div className=''>
      <Navbar user={user as User} />
      {children}
      <Footer />
    </div>
  )
}
