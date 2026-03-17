'use client'

import { Bell } from 'lucide-react'
import Link from 'next/link'

const Notification = () => {
  return (
    <Link href={'/#'} className='relative'>
      <Bell className='h-6 w-6' />
      <span className='absolute -top-2 -right-2 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-medium lg:hover:scale-200 transition-all duration-300'>
        6
      </span>
    </Link>
  )
}

export default Notification
