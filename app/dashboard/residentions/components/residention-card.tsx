"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"

import { Residention } from "@/types/residention"
import { deleteResidention } from "@/lib/api"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { buttonVariants } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"
import { queryClient } from "@/components/query-provider"

type Props = {
  residention?: Residention
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const ResidentionCard = ({ residention, setOpen }: Props) => {
  const router = useRouter()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { mutate } = useMutation({
    mutationFn: () => deleteResidention(residention?.id!),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["residentions"] })
      toast({
        title: "Success",
        description: "Residention deleted successfully",
      })
    },

    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error",
        description: error.response?.data.message ?? "Something went wrong",
      })
    },
  })

  const handleDeleteResidention = (event: React.MouseEvent) => {
    event.stopPropagation()
    mutate()
  }

  const handleNavigateToResidention = (residentionId: number) => {
    router.push(`/dashboard/residentions/${residentionId}`)
  }

  return (
    <>
      {residention ? (
        <div
          onClick={() => handleNavigateToResidention(residention.id)}
          className=" overflow-hidden rounded-md border transition-colors hover:cursor-pointer md:h-80 md:w-80"
        >
          {residention.cover ? (
            <img
              src={residention.cover}
              alt={residention.name}
              className="h-60 w-full rounded-t-md object-cover md:w-80"
            />
          ) : (
            <div className="h-60 rounded-t-md  bg-secondary  md:w-80"></div>
          )}

          <div className="relative">
            <h3 className="max-w-72 p-1 text-xl tracking-wide">
              {residention.name}
            </h3>

            <Icons.trash
              className="absolute right-2 top-3 h-4 w-4 hover:cursor-pointer"
              onClick={(event) => {
                event.stopPropagation()
                setIsDeleteDialogOpen(true)
              }}
            />
          </div>
        </div>
      ) : (
        <div
          className="h-80 w-full overflow-hidden rounded-md border border-dashed transition-colors hover:cursor-pointer md:w-80"
          onClick={() => {
            setOpen?.(true)
            console.log("qwe")
          }}
        >
          <div className="grid h-full w-full place-content-center text-lg">
            <div className="flex items-center ">
              <Icons.plus className="inline-block" />
              <span>Add new residention</span>
            </div>
          </div>
        </div>
      )}

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete
              {residention?.name ?? ""} residention.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={(event) => event.stopPropagation()}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteResidention}
              className={buttonVariants({ variant: "destructive" })}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ResidentionCard
