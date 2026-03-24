'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { LogOut, Settings, TriangleAlert, User } from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { Loader } from 'lucide-react'

const Profile = () => {
  const { data: user, isLoading, error } = useCurrentUser()

  // FIX ANIMATION
  if (isLoading) {
    return (
      <div className='animation-rotate'>
        <Loader />
      </div>
    )
  }

  if (error || !user) return <TriangleAlert />

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user.image || ''} />

            <AvatarFallback>
              <User className='h-6 w-6 m-2' />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10}>
          <DropdownMenuLabel>{user.role || null}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href='/dashboard' className='flex gap-2'>
              <User className='h-[1.2rem] w-[1.2rem] mr-2' />
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className='h-[1.2rem] w-[1.2rem] mr-2' />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem
            variant='destructive'
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            <LogOut className='h-[1.2rem] w-[1.2rem] mr-2' />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default Profile
