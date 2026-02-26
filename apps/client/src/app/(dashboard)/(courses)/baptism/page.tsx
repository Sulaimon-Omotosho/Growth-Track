import { Button } from '@/components/ui/button'
import React from 'react'

const Baptism = () => {
  return (
    <section className='pb-10'>
      <section className='w-full h-120 overflow-hidden relative'>
        {/* Check linear gradient */}
        <div className='bg-[url("/assets/Baptism.jpg")] bg-cover bg-center bg-no-repeat absolute inset-0' />
        <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent' />

        <div className='relative z-5 h-full flex flex-col justify-end text-white text-center px-6 pb-16'>
          <h1 className='text-4xl font-bold'>Baptismal Class</h1>
          <p className='font-semibold text-lg'>
            Get a teaching about baptism and be baptised by full immersion.
          </p>
        </div>
      </section>
      {/* DESCRIPTION */}
      <section className='max-w-3xl mx-auto px-4 py-12'>
        <h1 className='text-3xl font-bold text-center mb-4'>
          The Baptismal Class
        </h1>
        <p className='text-gray-600 mb-2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam quos
          nulla porro sit deleniti eum assumenda quod aut molestiae inventore
          eaque provident alias exercitationem deserunt quis velit at architecto
          officiis odit minima, delectus vero. Commodi aliquam, eum soluta
          praesentium ea tempore non explicabo rem earum iusto qui. Maiores,
          culpa! Architecto ab aliquid voluptatibus impedit, molestias officia
          aperiam in, velit perspiciatis, iure distinctio. Est cupiditate,
          quidem illum quae mollitia veritatis vero!:
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
      <section className='flex items-center justify-center'>
        <Button className='rounded-full w-[70%] lg:w-2xl'>Sign Up</Button>
      </section>
    </section>
  )
}

export default Baptism
