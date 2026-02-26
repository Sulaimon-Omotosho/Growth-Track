'use client'

import { TrendingUp } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

export const description = 'Church service attendance'

const chartData = [
  { month: 'January', sunday: 186, midweek: 80 },
  { month: 'February', sunday: 305, midweek: 200 },
  { month: 'March', sunday: 237, midweek: 120 },
  { month: 'April', sunday: 73, midweek: 190 },
  { month: 'May', sunday: 209, midweek: 130 },
  { month: 'June', sunday: 214, midweek: 140 },
]

const chartConfig = {
  desktop: {
    label: 'Sunday',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Midweek',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function AttendanceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Chart</CardTitle>
        <CardDescription>
          Showing total attendance for the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 lg:px-6'>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Area
              dataKey='midweek'
              type='natural'
              fill='var(--color-mobile)'
              fillOpacity={0.4}
              stroke='var(--color-mobile)'
              stackId='a'
            />
            <Area
              dataKey='sunday'
              type='natural'
              fill='var(--color-desktop)'
              fillOpacity={0.4}
              stroke='var(--color-desktop)'
              stackId='a'
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            {/* <div className='flex items-center gap-2 leading-none font-medium'>
              Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
            </div> */}
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              January - June 2026
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
