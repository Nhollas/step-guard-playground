import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isLongString = (value: unknown): value is string =>
  value !== null &&
  value !== undefined &&
  typeof value === "string" &&
  value.length > 20
