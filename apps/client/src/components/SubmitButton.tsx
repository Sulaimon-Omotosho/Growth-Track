import { LoaderIcon } from 'lucide-react'
import React from 'react'

interface ButtonProps {
  isLoading?: boolean
  className?: string
  children?: React.ReactNode
}

const SubmitButton = ({ isLoading, className, children }: ButtonProps) => {
  return (
    <button
      type='submit'
      disabled={isLoading}
      className={
        className ??
        'bg-amber-800 hover:bg-amber-700 text-white w-full h-8 rounded-md cursor-pointer transition-all duration-300'
      }
    >
      {isLoading ? (
        <div className='flex items-center justify-center gap-4'>
          <LoaderIcon className='animate-spin' /> <span>Loading...</span>{' '}
        </div>
      ) : (
        children
      )}
    </button>
  )
}

export default SubmitButton
