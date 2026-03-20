'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

const Profile = ({ image, role }: { image: string; role: string }) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={image} />

            <AvatarFallback>
              <User className='h-6 w-6 m-2' />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10}>
          <DropdownMenuLabel>{role}</DropdownMenuLabel>
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
