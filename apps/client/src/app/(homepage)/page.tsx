// import TestUser from '@/components/TestUser'
import { Dot } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <section className='pt-16'>
      {/* FEATURE IMAGE  */}
      <section className='w-full h-120 overflow-hidden relative'>
        {/* Check linear gradient */}
        <div className='bg-[url("/assets/Pastor-Bolaji-Idowu.png")] bg-cover bg-center bg-no-repeat absolute inset-0' />
        <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent' />

        <div className='relative z-5 h-full flex flex-col justify-end text-white text-center px-6 pb-16'>
          <h1 className='text-4xl font-bold'>Growth Track</h1>
          <p className='font-semibold text-lg'>
            Know HICC and be empowered to walk in Christ's fullness.
          </p>
        </div>
      </section>
      {/* DESCRIPTION */}
      <section className='max-w-3xl mx-auto px-4 py-12'>
        <h1 className='text-3xl font-bold text-center mb-4'>
          The Growth Tracker
        </h1>
        <p className='text-gray-600 mb-2'>
          The Harvesters Growth Track is a system designed to help you know
          Harvesters, discover your God-given purpose, and grow in the Church of
          Christ. The Growth Tracker makes it easy to measure and strengthen
          your spiritual growth through:
        </p>
        <div className=' text-gray-600 pl-1 flex flex-col gap-3 '>
          <p className='flex items-center gap-2'>
            <span className='w-5 h-5 rounded-full bg-amber-300' />
            <span>Connecting with the church</span>
          </p>
          <p className='flex items-center gap-2'>
            <span className='w-5 h-5 rounded-full bg-amber-300' />
            <span>Discovering your strengths and purpose</span>
          </p>
          <p className='flex items-center gap-2'>
            <span className='w-5 h-5 rounded-full bg-amber-300' />
            <span>Developing your personal leadership skills</span>
          </p>
          <p className='flex items-center gap-2'>
            <span className='w-5 h-5 rounded-full bg-amber-300' />
            <span>
              and, Using these discoveries to make a difference in the world
            </span>
          </p>
        </div>
      </section>
      {/* TEST  */}
      {/* <TestUser /> */}
      {/* NEXT STEPS */}
      <section className=''>
        <h1 className='text-3xl font-bold text-center mb-1'>Next Steps</h1>
        <p className='text-amber-600 mb-5 font-semibold text-center text-lg'>
          Other available decisions...
        </p>
        <div className='flex flex-col lg:flex-row gap-5 justify-center items-center'>
          <div className='p-4 flex flex-col w-105'>
            <Image
              src='/assets/Growthtrack-img1.jpg'
              alt='Small Group'
              width={1000}
              height={1000}
              className='w-full overflow-hidden mb-2'
            />
            <h1 className='text-3xl font-bold text-center mb-2'>Small Group</h1>
            <p className='font-semibold text-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              quidem fugit nam doloribus eaque rem atque reiciendis voluptatum
              earum eius.
            </p>
            <Link
              href='/'
              className='text-amber-600 mb-5 font-semibold text-lg underline underline-offset-6 hover:no-underline w-fit'
            >
              Sign Up
            </Link>
          </div>
          <div className='p-4 flex flex-col w-105'>
            <Image
              src='/assets/Growthtrack-img1.jpg'
              alt='Small Group'
              width={1000}
              height={1000}
              className='w-full overflow-hidden mb-2'
            />
            <h1 className='text-3xl font-bold text-center mb-2'>Workforce</h1>
            <p className='font-semibold text-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              quidem fugit nam doloribus eaque rem atque reiciendis voluptatum
              earum eius.
            </p>
            <Link
              href='/'
              className='text-amber-600 mb-5 font-semibold text-lg underline underline-offset-6 hover:no-underline w-fit'
            >
              Sign Up
            </Link>
          </div>
          <div className='p-4 flex flex-col w-105'>
            <Image
              src='/assets/Growthtrack-img1.jpg'
              alt='Small Group'
              width={1000}
              height={1000}
              className='w-full overflow-hidden mb-2'
            />
            <h1 className='text-3xl font-bold text-center mb-2'>
              Water Baptism
            </h1>
            <p className='font-semibold text-lg'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
              quidem fugit nam doloribus eaque rem atque reiciendis voluptatum
              earum eius.
            </p>
            <Link
              href='/'
              className='text-amber-600 mb-5 font-semibold text-lg underline underline-offset-6 hover:no-underline w-fit'
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
      {/* The Growth Tracker */}
    </section>
  )
}
