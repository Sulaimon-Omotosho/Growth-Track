import { Calendar18 } from './Calender18'
import { EventsCarousel } from './EventsCarousel'

const Events = () => {
  return (
    <div className='flex flex-col xl:flex-row gap-4'>
      <div className='xl:flex-1/2'>
        <Calendar18 />
      </div>
      <div className='xl:flex-1/2 flex justify-center'>
        <EventsCarousel />
      </div>
    </div>
  )
}

export default Events
