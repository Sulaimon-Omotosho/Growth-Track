'use client'

import { Eye, EyeClosed, Mail, User } from 'lucide-react'
import React, { useState } from 'react'
import SubmitButton from '../SubmitButton'
import { signIn } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { UserFormSchema, UserLoginSchema, UserSignUpSchema } from '@repo/types'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'

const AuthSchema = z.discriminatedUnion('mode', [
  UserLoginSchema.extend({ mode: z.literal('login') }),
  UserSignUpSchema.extend({ mode: z.literal('signup') }),
])

const AuthForm = () => {
  const [signUp, setSignUp] = useState(false)
  const [view, setView] = useState(false)

  type AuthFormData = z.infer<typeof AuthSchema>
  // type UserFormData = z.infer<typeof UserFormSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(AuthSchema),
    defaultValues: {
      mode: 'login',
      email: 'johndoe@church.com',
      password: 'password123',
    },
  })
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<UserFormData>({
  //   resolver: zodResolver(signUp ? UserSignUpSchema : UserLoginSchema),
  //   defaultValues: {
  //     email: 'johndoe@church.com',
  //     password: 'password123',
  //   },
  // })

  const router = useRouter()

  const login = async (data: AuthFormData) => {
    if (!signUp) {
      const res = await signIn('credentials', {
        redirect: false,
        callbackUrl: '/',
        email: data.email,
        password: data.password,
      })
      console.log(res)
      if (res?.ok) {
        console.log('Credentials login successful')
      } else {
        console.error('Login failed:', res?.error)
      }
    } else {
      const res = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      })
      if (!res.ok) {
        throw new Error('Signup failed')
      }

      // Auto Login
      await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: '/',
      })
    }
  }

  return (
    <div>
      <h1 className='font-bold text-center text-xl lg:text-3xl pb-3'>
        {signUp ? 'Sign Up' : 'Login'}
      </h1>
      <form
        onSubmit={handleSubmit(login, (errors) =>
          console.log('FORM ERRORS:', errors),
        )}
        className='space-y-6 flex-1 bg-transparent'
      >
        {signUp && (
          <>
            <div className='flex gap-2 items-center rounded-md border border-black bg-black'>
              <User className='w-6 h-6 text-gray-200 ml-2' />
              <input
                type='text'
                id='username'
                placeholder='Username'
                {...register('username')}
                className='bg-black placeholder:text-dark-500 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0 w-full px-2'
              />
            </div>
            {/* {errors.username && (
              <p className='text-xs text-red-500'>{errors.username.message} </p>
            )} */}
          </>
        )}
        <>
          <div className='flex gap-2 items-center rounded-md border border-black bg-black'>
            <Mail className='w-6 h-6 text-gray-200 ml-2' />
            <input
              type='email'
              id='email'
              placeholder='Email'
              {...register('email')}
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
              className='bg-black placeholder:text-dark-500 h-9 focus-visible:ring-0 focus-visible:ring-offset-0 text-white border-0 w-full px-2'
            />
          </div>
          {errors.password && (
            <p className='text-xs text-red-500'>{errors.password.message} </p>
          )}
        </>

        <div className=''>
          <SubmitButton>{signUp ? 'Sign Up' : 'Login'}</SubmitButton>
          <p className='text-sm pt-2'>
            {signUp ? 'Have An Account?' : `Don't Have An Account?`}
            <span
              onClick={() => setSignUp(!signUp)}
              className='underline text-amber-500 hover:text-amber-800 pl-2 cursor-pointer'
            >
              {signUp ? 'Login' : 'Sign Up'}
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
