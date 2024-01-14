import z from "zod"

export const ResidentionPayloadSchema = z.object({
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  description: z.string().nullable().optional(),
  cover: z.string().nullable().optional(),
})

export const ResidentionSchema = z.object({
  id: z.number(),
  name: z.string(),
  phone: z.string(),
  email: z.string().email(),
  description: z.string().nullable().optional(),
  cover: z.string().nullable().optional(),
})

export const ResidentionsSchema = z.array(ResidentionSchema)

export type ResidentionPayload = z.infer<typeof ResidentionPayloadSchema>

export type Residention = z.infer<typeof ResidentionSchema>
