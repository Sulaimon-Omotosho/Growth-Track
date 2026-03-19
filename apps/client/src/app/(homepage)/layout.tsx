import { User } from '@repo/types'
import Navbar from '@/src/components/Navbar'
import Footer from '@/src/components/Footer'
import { getCachedSession } from '@/src/lib/auth'
// import './globals.css'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getCachedSession()
  let user: User | null = null

  try {
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
        console.warn('Failed to fetch user (invalid token):', res.status)
        user = null
      }
    }
  } catch (error) {
    console.error('User fetch error:', error)
    user = null
  }
  // console.log('Refresh Token:', session?.refreshToken)
  // console.log('Access Token:', session?.accessToken)

  return (
    <div className=''>
      <Navbar user={user as User} />
      {children}
      <Footer />
    </div>
  )
}
