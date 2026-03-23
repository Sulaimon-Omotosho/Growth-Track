'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { User, UserFormSchema } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useRouter } from 'next/navigation'
import SubmitButton from '../SubmitButton'
import { FieldGroup, Field, FieldError, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'
import { useUpdateProfile } from '@/src/hooks/useUpdateProfile'

const Onboarding = ({ user }: { user: User }) => {
  const { mutate, isPending } = useUpdateProfile()
  const router = useRouter()

  const form = useForm<z.input<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      username: user?.username ?? '',
      phone: user?.phone ?? '',
      dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : '',
      // email: user?.email ?? '',
      // gender: user?.gender ?? 'MALE',
      // about: user?.about ?? '',
    },
  })

  function onSubmit(data: z.output<typeof UserFormSchema>) {
    console.log('User Form', data)
    mutate(data, {
      onSuccess: () => {
        router.push('/dashboard')
      },
      onError: (error) => {
        console.error(error)
      },
    })
  }

  return (
    <div className='w-full sm:max-w-md no-scrollbar'>
      <form id='profile-edit' onSubmit={form.handleSubmit(onSubmit as any)}>
        <FieldGroup className='gap-2'>
          <Controller
            name='firstName'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='firstName'>First Name</FieldLabel>
                <Input
                  {...field}
                  id='firstName'
                  aria-invalid={fieldState.invalid}
                  placeholder='John'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='lastName'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='lastName'>Last Name</FieldLabel>
                <Input
                  {...field}
                  id='lastName'
                  aria-invalid={fieldState.invalid}
                  placeholder='Doe'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='username'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='username'>Username</FieldLabel>
                <Input
                  {...field}
                  id='username'
                  aria-invalid={fieldState.invalid}
                  placeholder='JohnDoe'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='phone'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='phone'>Phone Number</FieldLabel>
                <PhoneInput
                  id='phone'
                  {...field}
                  international
                  defaultCountry='NG'
                  value={field.value || ''}
                  onChange={field.onChange}
                  className='rounded-md border px-3 py-2'
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='dob'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='dob'>D.O.B</FieldLabel>
                <Input
                  type='date'
                  {...field}
                  id='dob'
                  value={field.value as string}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <SubmitButton isLoading={isPending}>Update</SubmitButton>
        </FieldGroup>
      </form>
    </div>
  )
}

export default Onboarding
