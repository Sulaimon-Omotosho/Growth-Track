'use client'

import { ReactNode } from 'react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer'
import { Button } from '../ui/button'

interface RightDrawerProps {
  trigger: ReactNode
  title: string
  description?: string
  submitLabel?: string
  formId?: string
  children: ReactNode
}

export function RightDrawer({
  trigger,
  title,
  description,
  submitLabel,
  formId,
  children,
}: RightDrawerProps) {
  return (
    <Drawer direction='right'>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        <div className='no-scrollbar overflow-y-auto px-4'>{children}</div>
        <DrawerFooter>
          {formId && (
            <Button type='submit' form={formId}>
              {submitLabel}
            </Button>
          )}
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
