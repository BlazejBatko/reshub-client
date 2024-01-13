import React from "react"
import { Control, Controller, FieldErrors } from "react-hook-form"

import { Input } from "../ui/input"

type Props = {
  control: Control<any>
  errors: FieldErrors<any>
  name: string
  placeholder?: string
  label?: string
  inputProps?: React.ComponentProps<typeof Input>
}

const ControlledInput = ({
  control,
  label,
  name,
  placeholder,
  errors,
  inputProps,
}: Props) => {
  return (
    <div>
      <span className="mb-1 block text-lg tracking-wide">{label}</span>
      <Controller
        name={name}
        control={control}
        render={({ field: { name, onChange, value } }) => (
          <Input
            name={name}
            onChange={onChange}
            value={value ?? ""}
            placeholder={placeholder}
            {...inputProps}
          />
        )}
      />
      <span className="text-red-500">{errors[name]?.message}</span>
    </div>
  )
}

export default ControlledInput
