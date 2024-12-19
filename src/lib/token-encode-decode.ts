import { env } from "./env"

const { PROGRESS_TOKEN_SECRET } = env

/**
 * Encodes the progress array into a token
 * @param progress - The array of progress steps to encode
 * @returns A string token representing the encoded progress
 */
export async function encodeProgressToken(progress: string[]): Promise<string> {
  const progressString = JSON.stringify(progress)
  const encodedProgress = btoa(progressString)
  const hash = await generateHash(encodedProgress)
  return `${encodedProgress}.${hash}`
}

/**
 * Decodes the progress token back into an array
 * @param token - The token to decode
 * @returns A promise that resolves to an array of progress steps
 * @throws An error if the token is invalid or the hash does not match
 */
export async function decodeProgressToken(token: string): Promise<string[]> {
  const [encodedProgress, hash] = token.split(".")
  if (!encodedProgress || !hash) {
    throw new Error("Invalid token format")
  }
  const validHash = await generateHash(encodedProgress)
  if (hash !== validHash) {
    throw new Error("Invalid token hash")
  }
  const progressString = atob(encodedProgress)
  return JSON.parse(progressString)
}

/**
 * Generates a hash for the given data using the secret
 * @param data - The data to hash
 * @returns A promise that resolves to a hash string
 */
async function generateHash(data: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(data + PROGRESS_TOKEN_SECRET)
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}
