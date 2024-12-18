import { env } from "./env"

const { PROGRESS_TOKEN_SECRET } = env

export async function encodeProgressToken(progress: string[]) {
  const progressString = JSON.stringify(progress)
  const encodedProgress = btoa(progressString)
  const hash = await generateHash(encodedProgress)
  return `${encodedProgress}.${hash}`
}

export async function decodeProgressToken(token: string): Promise<string[]> {
  const [encodedProgress, hash] = token.split(".")
  if (!encodedProgress || !hash) {
    throw new Error("Invalid token")
  }
  const validHash = await generateHash(encodedProgress)
  if (hash !== validHash) {
    throw new Error("Invalid token")
  }
  const progressString = atob(encodedProgress)
  return JSON.parse(progressString)
}

async function generateHash(data: string) {
  const msgBuffer = new TextEncoder().encode(data + PROGRESS_TOKEN_SECRET)
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}
