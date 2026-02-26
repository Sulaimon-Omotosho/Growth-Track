'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '@/components/ui/textarea'

const CellCard = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const autoResize = () => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = el.scrollHeight + 'px'
  }
  return (
    <div className='px-4 py-4 lg:py-2 mt-4 outline-1 rounded-md shadow-sm'>
      {/* HEAD  */}
      <div className='flex items-center justify-between px-5'>
        <h2 className='font-bold text-lg'>APG 4</h2>
        <Image
          src='/assets/logo.jpeg'
          alt='logo'
          width={100}
          height={100}
          className='w-10 h-10 rounded-lg'
        />
      </div>
      {/* DETAILS  */}
      <div className='flex flex-col gap-1'>
        <div className='flex justify-between'>
          <p className='font-semibold'>Cell Leader</p>
          <span className=''>Sulaimon Omotosho</span>
        </div>
        <div className='flex justify-between'>
          <p className='font-semibold'>Next Meeting</p>
          <span className=''>Sunday, 24.12.2026</span>
        </div>
        <div className='flex flex-col'>
          <div className='flex items-center justify-between pb-2'>
            <p className='font-semibold text-sm pb-1'>Message Leader</p>
            <button className='px-10 py-1 rounded-full bg-blue-500 hover:bg-blue-700 hover:cursor-pointer transition-all duration-300'>
              Send
            </button>
          </div>
          <Textarea
            ref={textareaRef}
            placeholder='Message...'
            rows={1}
            onInput={autoResize}
            className='resize-none min-h-23.5 max-h-23.5 overflow-y-auto wrap-break-word whitespace-pre-wrap'
          />
        </div>
      </div>
    </div>
  )
}

export default CellCard
