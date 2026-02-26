'use client'

// import Autoplay from 'embla-carousel-autoplay'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { Button } from '../ui/button'

export function EventsCarousel() {
  // const plugin = React.useRef(
  //   Autoplay({ delay: 2000, stopOnInteraction: true }),
  // )

  return (
    <Carousel
      // plugins={[plugin.current]}
      className='w-full max-w-[80%] flex items-center justify-center'
      // className='w-full max-w-[80%] flex items-center justify-center'
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className=''>
              <Card className='p-0'>
                <Image
                  src='/assets/Winepress.jpg'
                  alt='Even Image'
                  width={1000}
                  height={1000}
                  className='rounded-t-xl'
                />
                {/* <CardContent className='flex aspect-square items-center justify-center p-6'>
                  <span className='text-4xl font-semibold'>{index + 1}</span>
                </CardContent> */}
                <CardContent className='flex flex-col gap-2 md:gap-4 p-0 pb-2'>
                  {/* <Image
                    src='/assets/Winepress.jpg'
                    alt='Even Image'
                    width={1000}
                    height={1000}
                    className='rounded-t-xl'
                  /> */}
                  <CardTitle>Winepress 2026</CardTitle>
                  <CardDescription>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vitae dolorem autem eius doloremque natus officiis mollitia
                    enim laudantium totam reiciendis itaque, quas maiores!
                    Ipsum, voluptatem!
                  </CardDescription>
                  <CardAction className='cursor-pointer'>Sign Up</CardAction>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
