import { z } from "zod"

const envSchema = z.object({
  PROGRESS_TOKEN_SECRET: z.string(),
})

export const env = envSchema.parse(process.env)

export type Env = z.infer<typeof envSchema>
