"use client"

import { JourneyFormStep } from "@/components/form-step"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { STEP_TWO } from "@/config/journey-steps"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(6),
})

export default function PageComponent() {
  return (
    <JourneyFormStep
      schema={schema}
      nextStepPathname={STEP_TWO}
      render={({ control }) => (
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    />
  )
}
