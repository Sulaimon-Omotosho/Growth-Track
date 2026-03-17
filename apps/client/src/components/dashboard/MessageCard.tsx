import React from 'react'

const MessageCard = () => {
  return (
    <div className='flex flex-col gap-2 outline-1 outline-gray-300 dark:outline-gray-700  shadow-sm shadow-gray-600 p-2 rounded-md'>
      <h1 className='font-semibold'>@UncleSula</h1>
      <hr className='pb-1' />
      <p className='text-sm rounded-md p-2'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque ab error
        repellendus! ...
      </p>
      <hr className='pt-1' />
      <p className='text-xs text-gray-800 dark:text-gray-400 text-end'>
        Sunday, 17 November 2026
      </p>
    </div>
  )
}

export default MessageCard
