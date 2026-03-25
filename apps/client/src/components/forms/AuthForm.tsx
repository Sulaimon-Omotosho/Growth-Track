'use client'

import { Eye, EyeClosed, Mail } from 'lucide-react'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useForm, useWatch } from 'react-hook-form'
import { AuthFormSchema } from '@repo/types'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import SubmitButton from '../SubmitButton'

type AuthFormData = z.infer<typeof AuthFormSchema>

const AuthForm = () => {
  const [authError, setAuthError] = useState<string | null>(null)
  const [view, setView] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthFormSchema),
    defaultValues: {
      mode: 'login',
      email: '',
      password: '',
    },
  })

  const mode = useWatch({ control, name: 'mode' })
  const isSignup = mode === 'signup'

  const onSubmit = async (data: AuthFormData) => {
    setAuthError(null)

    if (data.mode === 'login') {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (res?.ok) {
        router.push('/redirect')
      } else {
        setAuthError(res?.error || 'Login failed')
      }
    }

    if (data.mode === 'signup') {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email, password: data.password }),
        },
      )

      if (!res.ok) {
        const err = await res.json().catch(() => null)
        setAuthError(err?.message || 'Signup failed')
        return
      }

      // Auto Login
      const loginRes = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      })

      if (loginRes?.ok) {
        router.push('/redirect')
      } else {
        setAuthError(loginRes?.error || 'Signup failed')
      }
    }
  }

  return (
    <div>
      <h1 className='font-bold text-center text-xl lg:text-3xl pb-3'>
        {isSignup ? 'Sign Up' : 'Login'}
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-6 flex-1 bg-transparent'
      >
        <>
          <div className='flex gap-2 items-center rounded-md border border-black bg-black'>
            <Mail className='w-6 h-6 text-gray-200 ml-2' />
            <input
              type='email'
              id='email'
              placeholder='Email'
              {...register('email')}
              // required
              className='bg-black placeholder:text-dark-500 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0 w-full px-2'
            />
          </div>
          {errors.email && (
            <p className='text-xs text-red-500'>{errors.email.message}</p>
          )}
        </>
        <>
          <div className='flex gap-2 items-center rounded-md border border-black bg-black'>
            <button type='button' onClick={() => setView(!view)}>
              {view ? (
                <EyeClosed className='w-6 h-6 text-gray-200 ml-2 cursor-pointer' />
              ) : (
                <Eye className='w-6 h-6 text-gray-200 ml-2 cursor-pointer' />
              )}
            </button>
            <input
              type={view ? 'text' : 'password'}
              id='password'
              placeholder='Password'
              {...register('password')}
              // required
              className='bg-black placeholder:text-dark-500 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0 w-full px-2'
            />
          </div>
          {errors.password && (
            <p className='text-xs text-red-500'>{errors.password.message} </p>
          )}
        </>

        <div className=''>
          <SubmitButton isLoading={isSubmitting}>
            {isSignup ? 'Sign Up' : 'Login'}
          </SubmitButton>
          <p className='text-sm pt-2'>
            {isSignup ? 'Have An Account?' : `Don't Have An Account?`}
            <span
              onClick={() => setValue('mode', isSignup ? 'login' : 'signup')}
              className='underline text-amber-500 hover:text-amber-800 pl-2 cursor-pointer'
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </span>
          </p>
          {authError && <p className='text-red-500 text-sm'>{authError}</p>}
        </div>
      </form>
    </div>
  )
}

export default AuthForm
