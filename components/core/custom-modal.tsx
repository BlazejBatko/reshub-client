"use client"

import React from "react"

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet"

type Props = {
  open: boolean
  children: React.ReactNode
  title: string
  onOpenChange: (open: boolean) => void
}

const CustomDialog = ({ open, title, children, onOpenChange }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-10">{title}</SheetTitle>
          {children}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  )
}

export default CustomDialog
