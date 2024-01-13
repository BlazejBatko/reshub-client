import * as z from "zod"

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
})

export type LoginDto = {
  email: string
  password: string
}

export const RegisterDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
})

export type User = z.infer<typeof UserSchema>
export type RegisterDto = z.infer<typeof RegisterDtoSchema>
