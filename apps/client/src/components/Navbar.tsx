import Image from 'next/image'
import Link from 'next/link'
import { Home, LogIn, UserIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Theme from './Theme'
import Profile from './Profile'
import { User } from '@repo/types'
import { getCachedSession } from '../lib/auth'

const Navbar = async () => {
  const session = await getCachedSession()

  return (
    <nav className='w-full bg-white dark:bg-black border-b border-gray-400 shadow-3xl fixed z-10 md:px-10 lg:px-30'>
      <div className='flex items-center justify-between p-4'>
        {/* LEFT */}
        <Link href='/' className='flex items-center'>
          <Image
            src='/assets/Logo.jpeg'
            alt='HICC'
            width={50}
            height={50}
            className='w-10 h-10'
          />
          <p className='hidden md:block text-md font-medium tracking-wider'>
            THE GROWTH TRACKER
          </p>
        </Link>
        {/* RIGHT */}
        <div className='flex items-center gap-4'>
          <Link
            href='/'
            className='flex items-center justify-center gap-1 cursor-pointer'
          >
            <Home className='w-6 h-6 md:hidden ' />
            <p className='hidden md:block font-bold'>Home</p>
          </Link>
          {session?.user ? (
            <Profile />
          ) : (
            <Link
              href='/sign-in'
              className='flex items-center justify-center gap-1 cursor-pointer text-gray-700'
            >
              <LogIn className='w-6 h-6 md:w-4 md:h-4 text-gray-600' />
              <p className='hidden md:block text-gray-600 font-bold'>Login</p>
            </Link>
          )}
          <Theme />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
