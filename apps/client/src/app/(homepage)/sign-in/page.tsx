import Image from 'next/image'
import { redirect } from 'next/navigation'
import AuthForm from '@/src/components/forms/AuthForm'
import LoginGoogle from '@/src/components/LoginGoogle'
import { getCachedSession } from '@/src/lib/auth'

const SignIn = async () => {
  const session = await getCachedSession()
  if (session) redirect('/')

  return (
    <div className='p-4 h-[calc(100vh-64px)]  md:h-[calc(100vh-9rem)] flex items-center justify-center rounded-md'>
      <section className='md:mt-15 shadow-2xl dark:shadow-slate-900 rounded-md flex flex-col md:flex-row md:h-[85%] lg:h-[60%] xl:h-[75%] md:w-full lg:w-[60%] xl:w-1/2 gap-8 md:pr-6'>
        {/* Image Container */}
        <div className='relative h-1/3 w-full md:h-full md:w-1/2'>
          <Image
            src='/assets/Growthtrack-img1.jpg'
            alt='Growth Track'
            fill
            className='object-cover rounded-l-md'
            priority
          />
        </div>

        {/* Form Container */}
        <div className=' flex flex-col gap-3 md:w-1/2 p-4'>
          <AuthForm />
          <div className=''>
            <p className='text-center pb-1'>Or</p>
            <LoginGoogle />
          </div>
        </div>
      </section>
    </div>
  )
}

export default SignIn
