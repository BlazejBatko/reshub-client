import React from "react"
import { Control, Controller, FieldErrors } from "react-hook-form"

import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"

type Props = {
  control: Control<any>
  errors: FieldErrors<any>
  name: string
  placeholder?: string
  label?: string
  inputProps?: React.ComponentProps<typeof Input>
  isTextArea?: boolean
}

const ControlledInput = ({
  control,
  label,
  name,
  placeholder,
  errors,
  inputProps,
  isTextArea,
}: Props) => {
  return (
    <div>
      <span className="mb-1 block text-lg tracking-wide">{label}</span>
      <Controller
        name={name}
        control={control}
        render={({ field: { name, onChange, value } }) => (
          <>
            {isTextArea ? (
              <Textarea
                // @ts-ignore
                onChange={onChange}
                value={value ?? ""}
                placeholder={placeholder}
                {...inputProps}
              />
            ) : (
              <Input
                onChange={onChange}
                value={value ?? ""}
                placeholder={placeholder}
                {...inputProps}
              />
            )}
          </>
        )}
      />
      {/* @ts-ignore */}
      <span className="text-red-500">{errors[name]?.message}</span>
    </div>
  )
}

export default ControlledInput
