"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"

import { getResidentions } from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"
import CustomDialog from "@/components/core/custom-modal"
import { Icons } from "@/components/icons"

import Card from "./[id]/components/card"
import AddResidentionForm from "./components/add-residention-form"
import ResidentionCard from "./components/residention-card"

type Props = {}

const ResidentionsIndex = (props: Props) => {
  const [open, setOpen] = React.useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["residentions"],
    queryFn: getResidentions,
  })

  return (
    <div className="row-auto grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {error && (
        <div className="col-span-4 rounded-md  border border-destructive py-10">
          <div className="mx-auto w-fit">
            <Icons.sad
              className="mx-auto h-10 w-10 text-red-500"
              strokeWidth={1}
            />
            <span className="text-lg">Something went wrong</span>
          </div>
        </div>
      )}

      {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="aspect-video h-80 w-80" />
        ))}

      {data?.map((residention) => (
        <ResidentionCard residention={residention} key={residention.id} />
      ))}
      <ResidentionCard setOpen={setOpen} />

      <CustomDialog
        title="Add new residention"
        open={open}
        onOpenChange={setOpen}
      >
        <AddResidentionForm setOpen={setOpen} />
      </CustomDialog>
    </div>
  )
}

export default ResidentionsIndex
