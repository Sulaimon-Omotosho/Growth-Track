import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { UserProvider } from '@/src/utils/userContext'
import { SidebarProvider } from '@/src/components/ui/sidebar'
import { AppSidebar } from '@/src/components/dashboard/AppSidebar'
import Navbar from '@/src/components/dashboard/Navbar'
import { User } from '@repo/types'
import { getCachedSession } from '@/src/lib/auth'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'
  const session = await getCachedSession()
  let user: User | null = null

  if (!session) {
    redirect('/sign-in')
  }

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
        console.error('Failed to fetch user:', res.status)
      }
    }
  } catch (error) {
    console.error('User fetch error:', error)
  }

  return (
    <div className='h-full'>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar user={user} />
        <main className='w-full'>
          <Navbar user={user as User} />
          <UserProvider user={user as User}>{children}</UserProvider>
        </main>
      </SidebarProvider>
    </div>
  )
}
