import {
  BrickWallShield,
  BriefcaseBusiness,
  Calendar,
  CalendarCheck,
  ChartLine,
  ChevronUp,
  Earth,
  Home,
  Inbox,
  LibraryBig,
  Mail,
  Plus,
  School,
  Search,
  Settings,
  User,
  User2,
  Waves,
} from 'lucide-react'

import Link from 'next/link'
import Image from 'next/image'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import SignOutButton from '../SignOutButton'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar'

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Inbox',
    url: '#',
    icon: Inbox,
  },
  {
    title: 'Calendar',
    url: '#',
    icon: Calendar,
  },
  // {
  //   title: 'Search',
  //   url: '#',
  //   icon: Search,
  // },
  // {
  //   title: 'Settings',
  //   url: '#',
  //   icon: Settings,
  // },
]

export async function AppSidebar({ user }: any) {
  // const user = await getCurrentUser()

  // if (!user) {
  //   redirect('/sign-in')
  // }

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='py-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href='/'>
                <Image
                  src='/assets/logo.jpeg'
                  alt='logo'
                  width={20}
                  height={20}
                />
                <span>The Growth Tracker</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='font-bold text-black dark:text-white'>
            {user.firstName} {user.lastName}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className='hover:cursor-pointer'>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className='font-bold text-black dark:text-white'>
            Growth Journey
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/growth_track'>
                    <ChartLine />
                    Growth Track
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/foundation'>
                    <BrickWallShield />
                    Foundation Class
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/baptism'>
                    <Waves /> Baptism
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/allCourses'>
                    <LibraryBig /> Courses
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className='font-bold text-black dark:text-white'>
            Small Groups
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div>
                    <School />
                    {user.cell?.name || <Link href='/cell'>Join A Cell</Link>}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <div>
                    <BriefcaseBusiness />
                    {user.departments[1]?.name || (
                      <Link href='/departments'>Join A Department</Link>
                    )}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/interests'>
                    <Earth /> Other Groups
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className='font-bold text-black dark:text-white'>
            Contact
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/user'>
                    <Mail /> Messages
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href='/user'>
                    <CalendarCheck /> Events & Programs
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <Avatar>
                    <AvatarImage src={user.image!} />
                    {/* <AvatarImage src='https://avatars.githubusercontent.com/u/1486366' /> */}
                    <AvatarFallback>
                      <User className='h-6 w-6 m-2' />
                    </AvatarFallback>
                  </Avatar>{' '}
                  {user.firstName} {user.lastName}
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end' className='w-full'>
                <DropdownMenuItem>Prayer Request</DropdownMenuItem>
                <DropdownMenuItem>Help / Support</DropdownMenuItem>
                <DropdownMenuItem>
                  <SignOutButton /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
