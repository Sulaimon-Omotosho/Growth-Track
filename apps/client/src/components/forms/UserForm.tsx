'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { User, UserFormSchema } from '@repo/types'
import { Controller, useForm } from 'react-hook-form'
import z from 'zod'

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useRouter } from 'next/navigation'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '../ui/field'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const gender = [
  { label: 'Male', value: 'MALE' },
  { label: 'Female', value: 'FEMALE' },
] as const

const usersUrl = process.env.NEXT_PUBLIC_USERS_SERVICE_URL
console.log('before:', usersUrl)

const UserForm = ({ user }: { user: User }) => {
  const router = useRouter()

  const form = useForm<z.input<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      username: user?.username ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
      gender: (user?.gender as any) ?? 'MALE',
      dob: user.dob ? new Date(user.dob).toISOString().slice(0, 10) : undefined,
      about: user?.about ?? '',
    },
  })

  async function onSubmit(data: z.output<typeof UserFormSchema>) {
    // console.log('User Form', data)

    try {
      const res = await fetch('/api/users/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          dob: data.dob ? new Date(data.dob).toISOString() : undefined,
        }),
      })

      if (!res.ok) {
        throw new Error('failed to update profile')
      }

      const updatedUser = await res.json()
      // console.log('Updated User:', updatedUser)
      router.refresh()
      // drawer.close()
    } catch (error) {
      console.error(error)
    }
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
            name='gender'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation='responsive' data-invalid={fieldState.invalid}>
                <FieldContent className='flex-row justify-between'>
                  <FieldLabel htmlFor='gender'>Gender</FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id='gender'
                      aria-invalid={fieldState.invalid}
                      className=''
                    >
                      <SelectValue placeholder='Gender' />
                    </SelectTrigger>
                    <SelectContent position='item-aligned'>
                      {gender.map((gender) => (
                        <SelectItem key={gender.value} value={gender.value}>
                          {gender.label}{' '}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />
          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='email'>Email</FieldLabel>
                <Input
                  {...field}
                  id='email'
                  aria-invalid={fieldState.invalid}
                  placeholder='JohnDoe@email.com'
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
                  value={field.value}
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
                  // value={
                  //   field.value
                  //     ? field.value
                  //     : ''
                  // }
                  // onChange={(e) => field.onChange(e.target.value || undefined)}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='about'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='about'>Profile</FieldLabel>
                <Textarea
                  {...field}
                  id='about'
                  aria-invalid={fieldState.invalid}
                  placeholder='About yourself ...'
                  className='min-h-120px'
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        {/* <Field orientation='horizontal'>
          <Button type='submit' className='w-full' form='profile-edit'>
            Submit
          </Button>
        </Field> */}
      </form>
    </div>
  )
}

export default UserForm
