import { SidebarTrigger } from '../ui/sidebar'
import Profile from '../Profile'
import Theme from '../Theme'
import Notification from './Notification'
import { User } from '@repo/types'

const Navbar = async ({ user }: { user: User }) => {
  return (
    <nav className='px-4 py-2 flex items-center justify-between sticky top-0 bg-background z-10 shadow-lg dark:shadow-slate-900'>
      {/* LEFT */}
      <SidebarTrigger />
      {/* RIGHT */}
      <div className='flex items-center justify-end gap-4'>
        {/* USER MENU */}
        {/* <Bell className='h-6 w-6 m-2' /> */}
        <Notification />
        {user ? <Profile /> : null}
        {/* {user ? <Profile role={user.role} image={user.image || ''} /> : null} */}
        {/* THEME MENU */}
        <Theme />
      </div>
    </nav>
  )
}

export default Navbar
