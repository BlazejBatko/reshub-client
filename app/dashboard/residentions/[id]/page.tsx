"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"

import { getResidentionDetails } from "@/lib/api"
import { Button, buttonVariants } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"

import EditResidentionForm from "../components/edit-residention-form"
import Card from "./components/card"

const ResidentionDetailsIndex = () => {
  const params = useParams<{ id: string }>()
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["residentions", params.id],
    queryFn: () => getResidentionDetails(Number(params.id)),
    enabled: Boolean(params.id),
  })

  return (
    <main className="md:container">
      {error ? (
        <div>
          <Card>
            <div className="flex flex-col items-center justify-center gap-2">
              <Icons.sad className="h-10 w-10 text-red-500" strokeWidth={1} />
              <span>
                Unfortunately we failed trying to display informations for this
                residention
              </span>
              <Link
                href="/dashboard/residentions"
                className={buttonVariants({ variant: "ghost" })}
              >
                Go back to list
              </Link>
            </div>
          </Card>
        </div>
      ) : (
        <>
          <div className="relative overflow-hidden rounded-md">
            {isLoading ? (
              <Skeleton className="h-40 w-full rounded-md object-cover" />
            ) : (
              <>
                {data?.cover ? (
                  <img
                    src={data.cover}
                    className="h-40 w-full rounded-md object-cover"
                    alt=""
                  />
                ) : (
                  <div className="h-40 w-full rounded-md bg-secondary"></div>
                )}
                <div className="absolute inset-0 z-20 shadow-[inset_0_-150px_123px_0_rgba(0,0,0,0.75)]">
                  <h1 className="absolute left-5 top-5 text-2xl text-zinc-100 dark:text-primary md:bottom-5 md:text-4xl lg:text-6xl">
                    {data?.name}
                  </h1>
                </div>
                <Button
                  className="absolute bottom-5 right-5 z-20"
                  onClick={() => setIsEditDrawerOpen(true)}
                >
                  Manage Details
                </Button>

                <Sheet
                  open={isEditDrawerOpen}
                  onOpenChange={setIsEditDrawerOpen}
                >
                  <SheetContent>
                    <SheetTitle className="mb-5">Manage residention</SheetTitle>

                    {data && (
                      <EditResidentionForm
                        setOpen={setIsEditDrawerOpen}
                        residention={data}
                      />
                    )}
                  </SheetContent>
                </Sheet>
              </>
            )}
          </div>
          <div className="mt-10 grid grid-flow-row grid-cols-1 gap-5 lg:grid-cols-2">
            {data?.cover && (
              <Card>
                <img
                  src={data.cover}
                  className=" mx-auto h-auto max-h-[500px] w-auto rounded-md object-contain "
                  alt=""
                />
              </Card>
            )}
            <Card title="Description" isLoading={isLoading}>
              <p className="leading-[150%]">{data?.description}</p>
            </Card>

            <Card title="Contact details" isLoading={isLoading}>
              <div className="grid grid-cols-2 gap-5 pb-10">
                <div>
                  <span>E-mail:</span>
                  <p className="font-bold">
                    <a href={`mailto:${data?.email}`}>{data?.email}</a>
                  </p>
                </div>
                <div>
                  <span>Contact:</span>
                  <p className="font-bold">{data?.phone}</p>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}
    </main>
  )
}

export default ResidentionDetailsIndex
