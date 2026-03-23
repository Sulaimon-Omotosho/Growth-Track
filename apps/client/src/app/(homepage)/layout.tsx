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

  return (
    <div className=''>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
