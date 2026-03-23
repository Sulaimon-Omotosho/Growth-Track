import Link from 'next/link'
import { Progress } from '../ui/progress'
import { NextStepChart } from './NextStepChart'
import CellCard from './CellCard'

const progressColor = (value: number) =>
  value === 100 ? '[&>div]:bg-green-500' : ''

const NextStepCard = () => {
  return (
    <div className='flex flex-col xl:flex-row gap-4 '>
      {/* Steps  */}
      <section className='p-2 flex-1/2'>
        <div className='flex flex-col gap-1'>
          <div className='flex gap-2 items-center justify-between'>
            <p className=''>New Believer</p>
            <Progress value={100} className={`w-50 ${progressColor(100)}`} />
          </div>
          <div className='flex gap-2 items-center justify-between'>
            <p className=''>Growth Track</p>
            <Progress value={75} className={`w-50 ${progressColor(75)}`} />
          </div>
          <div className='flex gap-2 items-center justify-between'>
            <p className=''>Foundation Class</p>
            <Progress value={25} className={`w-50 ${progressColor(25)}`} />
          </div>
          <div className='flex gap-2 items-center justify-between'>
            <p className=''>Water Baptism</p>
            <Progress value={25} className={`w-50 ${progressColor(25)}`} />
          </div>
        </div>
        <Link
          href='#'
          className='text-sm pt-2 text-end transition-all duration-300'
        >
          <p className='hover:font-semibold hover:underline'>View All</p>
        </Link>
        <CellCard />
      </section>
      <section className='flex-1/2'>
        <NextStepChart />
      </section>
    </div>
  )
}

export default NextStepCard
