import { AppSidebar } from '@/components/dashboard/AppSidebar'
import Navbar from '@/components/dashboard/Navbar'
import Footer from '@/components/Footer'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { getServerSession } from 'next-auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { UserProvider } from '@/src/utils/userContext'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true'
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/sign-in')
  }

  const res = await fetch(`${process.env.USERS_SERVICE_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${session.accessToken}`,
    },
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to load dashboard')
  }

  const user = await res.json()

  return (
    <div className='h-full'>
      {/* <AuthGuard> */}
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar user={user} />
        <main className='w-full'>
          <Navbar user={user} />
          <UserProvider user={user}>{children}</UserProvider>
        </main>
      </SidebarProvider>
      {/* </AuthGuard> */}
    </div>
  )
}
