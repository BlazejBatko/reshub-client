import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"

import {
  ResidentionPayload,
  ResidentionPayloadSchema,
} from "@/types/residention"
import { addResidention } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import ControlledInput from "@/components/form/controlled-input"
import { queryClient } from "@/components/query-provider"

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddResidentionForm = ({ setOpen }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ResidentionPayload>({
    resolver: zodResolver(ResidentionPayloadSchema),
  })

  const { mutate } = useMutation({
    mutationFn: (data: ResidentionPayload) => addResidention(data),
    mutationKey: ["residentions"],
    onSuccess: () => {
      console.log("success")
      queryClient.invalidateQueries({ queryKey: ["residentions"] })
      setOpen(false)
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast({
        title: "Error",
        description: error.response?.data.message ?? "Something went wrong",
      })
    },
  })

  const onSubmit = (data: ResidentionPayload) => {
    mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ControlledInput
        name="name"
        control={control}
        errors={errors}
        label="Name *"
        inputProps={{
          autoComplete: "disabled",
        }}
      />
      <ControlledInput
        name="email"
        control={control}
        errors={errors}
        label="Email *"
        inputProps={{
          autoComplete: "disabled",
        }}
      />
      <ControlledInput
        name="phone"
        control={control}
        errors={errors}
        label="Phone *"
        inputProps={{
          autoComplete: "disabled",
        }}
      />
      <ControlledInput
        name="description"
        control={control}
        errors={errors}
        label="Description"
        isTextArea
        inputProps={{
          autoComplete: "disabled",
        }}
      />
      <ControlledInput
        name="cover"
        control={control}
        errors={errors}
        label="Cover url"
        inputProps={{
          autoComplete: "disabled",
        }}
      />
      <Button variant="default" className="mt-5">
        Add Residention
      </Button>
    </form>
  )
}

export default AddResidentionForm
