'use client'

import { TrendingUp } from 'lucide-react'
import { LabelList, RadialBar, RadialBarChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

export const description = 'A radial chart for Next Steps'

const chartData = [
  { browser: 'new believer', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'growth track', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'foundation', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'baptism', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'leadership', visitors: 90, fill: 'var(--color-other)' },
]

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

export function NextStepChart() {
  return (
    <Card className='flex flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Next Step</CardTitle>
        <CardDescription>Primary Courses</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey='browser' />}
            />
            <RadialBar dataKey='visitors' background>
              <LabelList
                position='insideStart'
                dataKey='browser'
                className='fill-white capitalize mix-blend-luminosity'
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        {/* <div className='flex items-center gap-2 leading-none font-medium'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div> */}
        <div className='text-muted-foreground leading-none'>
          Showing completed primary courses
        </div>
      </CardFooter>
    </Card>
  )
}
