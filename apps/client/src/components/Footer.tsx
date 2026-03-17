import { Facebook, FacebookIcon, Twitter, Youtube } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col bg-black text-gray-200'>
      <div className='px-4 pt-10 md:px-10 flex flex-col gap-10'>
        {/* UPDATES */}
        <div className='flex flex-col gap-4 items-center justify-center'>
          <h1 className='font-bold text-center'>
            WANT UPDATES AND NEWSLETTER?
          </h1>
          <div className='flex flex-col md:flex-row border-2 border-gray-200 w-full md:w-auto'>
            <input
              id='newsletter'
              type='email'
              className='h-10 p-4 lg:w-xl'
              placeholder='Your Email'
            />
            <div className='bg-gray-200 text-black flex items-center justify-center h-10 px-4 hover:cursor-pointer hover:bg-black hover:text-gray-200 border-l-2 border-gray-200'>
              <p className='text-center font-medium text-sm '>SUBSCRIBE</p>
            </div>
          </div>
          <p className='font-bold text-sm'>
            By subscribing to tis newsletter you consent to receiving automated
            mails from us.
          </p>
        </div>
        {/* LINKS */}
        <div className='flex flex-col md:flex-row gap-6'>
          {/* ABOUT US  */}
          <div className='flex flex-col gap-3 flex-2/5'>
            <h1 className='font-bold'>ABOUT US</h1>
            <p className='text-sm font-light'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo
              aperiam, possimus eligendi optio molestias quisquam laudantium
              veniam id hic ab earum obcaecati labore architecto facilis
              voluptates dignissimos fugit et. Neque, quasi. Ipsum maxime
              accusantium nam, praesentium sint, iste reprehenderit obcaecati
              autem exercitationem, tenetur veritatis maiores? Eum odio
              temporibus veniam soluta.
            </p>
          </div>
          {/* QUICK LINKS */}
          <div className='flex flex-col gap-3 flex-1/5'>
            <h1 className='font-bold'>QUICK LINKS</h1>
            <div className='text-sm font-light flex flex-col'>
              <Link href='/' className=''>
                HICC Homepage
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
            </div>
          </div>
          {/* NEXT STEPS */}
          <div className='flex flex-col gap-3 flex-1/5'>
            <h1 className='font-bold'>NEXT STEPS</h1>
            <div className='text-sm font-light flex flex-col'>
              <Link href='/' className=''>
                HICC Homepage
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
              <Link href='/' className=''>
                Online Church
              </Link>
            </div>
          </div>
          {/* LEGAL */}
          <div className='flex flex-col gap-3 flex-1/5'>
            <h1 className='font-bold'>LEGAL</h1>
            <div className='text-sm font-light flex flex-col'>
              <Link href='/' className=''>
                Privacy Policy
              </Link>
              <Link href='/' className=''>
                Terms Of Use
              </Link>
              <Link href='/' className=''>
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* HICC LOGO  */}
      <div className='flex flex-col md:flex-row items-center md:justify-center w-full gap-2 py-4'>
        <Image
          src='/assets/HICC-Logo2.jpg'
          alt='HICC Logo'
          width={200}
          height={200}
          className='w-50 h-auto'
        />
        <div className='flex items-center gap-6'>
          <Facebook />
          <Twitter />
          <Youtube />
        </div>
      </div>
      <div className='bg-gray-950 w-full p-4 text-center text-sm'>
        &copy; {new Date().getFullYear()}. Harvesters international Christian
        Center. All Rights Reserved.
      </div>
    </div>
  )
}

export default Footer
