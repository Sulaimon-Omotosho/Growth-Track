'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const LoginGoogle = () => {
  return (
    <button
      type='button'
      onClick={() => signIn('google', { callbackUrl: '/redirect' })}
      className='flex items-center justify-center p-1 gap-4 ring-1 ring-amber-600 dark:ring-amber-400 rounded-md mb-2 w-full cursor-pointer'
    >
      <Image
        src='/assets/google.png'
        alt='google'
        width={20}
        height={20}
        className='object-contain'
      />
      <span>Use Google</span>
    </button>
  )
}

export default LoginGoogle
