import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { useForm } from "react-hook-form"

import {
  Residention,
  ResidentionPayload,
  ResidentionPayloadSchema,
} from "@/types/residention"
import { addResidention, updateResidention } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import ControlledInput from "@/components/form/controlled-input"
import { queryClient } from "@/components/query-provider"

type Props = {
  residention: Residention
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const EditResidentionForm = ({ residention, setOpen }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ResidentionPayload>({
    resolver: zodResolver(ResidentionPayloadSchema),
    defaultValues: {
      name: residention.name,
      email: residention.email,
      phone: residention.phone,
      description: residention.description,
      cover: residention.cover,
    },
  })

  const { mutate } = useMutation({
    mutationFn: (data: ResidentionPayload) =>
      updateResidention(residention.id, data),
    mutationKey: ["residentions"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["residentions"] })
      setOpen(false)
      toast({
        title: "Success",
        description: "Residention updated successfully",
      })
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
          className: "h-40",
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
        Save
      </Button>
    </form>
  )
}

export default EditResidentionForm
