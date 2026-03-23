'use client'

import { Dot } from 'lucide-react'
import Link from 'next/link'
import { useUser } from '@/src/utils/userContext'
import { Progress } from '@/src/components/ui/progress'
import NextStepCard from '@/src/components/dashboard/NextStepCard'
import Events from '@/src/components/dashboard/Events'
import { AttendanceChart } from '@/src/components/dashboard/AttendanceChart'
import MessageCard from '@/src/components/dashboard/MessageCard'

const UserDashboard = () => {
  const { user } = useUser()
  

  return (
    <div className='px-4 md:px-6 py-6'>
      {user ? (
        <>
          {/* HEADER  */}
          <div className='flex flex-col gap-1'>
            <p className='font-semibold text-lg'>
              Welcome,{' '}
              <Link
                href={`dashboard/${user.id}`}
                className='font-normal hover:font-bold hover:underline transition-all duration-300'
              >
                {user?.firstName} {user?.lastName}
              </Link>
            </p>
            <p className='text-sm'>
              You're 75% through your Growth Track Classes
            </p>
            <Progress value={75} className='w-50' />
          </div>
          {/* BODY  */}
          <div className='w-full lg:flex gap-3 pt-3'>
            {/* Left  */}
            <div className='lg:flex-4/6 flex flex-col gap-4 rounded-sm'>
              <NextStepCard />
              <Events />
              <AttendanceChart />
            </div>
            {/* Right  */}
            <div className='lg:flex-2/6 flex flex-col mt-4 lg:mt-0 gap-3 lg:gap-6 rounded-sm w-full'>
              <div className=' flex flex-col rounded-sm w-full'>
                <h1 className='font-semibold'>Messages</h1>
                <div className='flex flex-col gap-3 p-2'>
                  <MessageCard />
                  <MessageCard />
                  <MessageCard />
                  <MessageCard />
                  <div className='w-full flex items-center justify-end'>
                    <div className='flex gap-0.5 hover:cursor-pointer pr-3'>
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                    </div>
                  </div>
                </div>
              </div>
              <div className=' flex flex-col rounded-sm w-full'>
                <h1 className='font-semibold'>Announcements</h1>
                <div className='flex flex-col gap-3 p-2'>
                  <MessageCard />
                  <MessageCard />
                  <MessageCard />
                  <MessageCard />
                  <div className='w-full flex items-center justify-end'>
                    <div className='flex gap-0.5 hover:cursor-pointer pr-3'>
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                      <Dot className='w-3 h-3 text-white bg-gray-600 rounded-full' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className='flex items-center justify-center'>
          <h2 className='font-bold text-center text-xl'>Loading ...</h2>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
