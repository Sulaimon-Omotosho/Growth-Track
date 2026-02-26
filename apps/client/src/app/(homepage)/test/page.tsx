import TestUser from '@/components/TestUser'
import { getCurrentUser } from '@/src/lib/getCurrentUser'

const Test = async () => {
  const user = await getCurrentUser()
  // console.log('user:', user)

  return (
    <div className='pt-40 pb-20 text-center'>
      <TestUser />
      <p className='mt-6 text-xl'>DB User ID: {user?.id ?? 'null'}</p>
    </div>
  )
}

export default Test
