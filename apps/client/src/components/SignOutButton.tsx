'use client'

import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className='flex items-center justify-center gap-1 cursor-pointer'
    >
      <LogOut className='w-6 h-6 md:w-4 md:h-4' />
    </button>
  )
}

export default SignOutButton
