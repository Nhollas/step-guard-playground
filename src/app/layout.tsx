import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ToastProvider } from "@/components/ui/toast"
import { Suspense } from "react"
import { StepGuardToast } from "@/components/step-guard-toast"
import { JourneyStoreProvider } from "@/providers/journey-store-provider"
import QueryClientProvider from "@/providers/query-client-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <JourneyStoreProvider>
        <QueryClientProvider>
          <ToastProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
              <main>{children}</main>
              <Toaster />
              <Suspense>
                <StepGuardToast />
              </Suspense>
            </body>
          </ToastProvider>
        </QueryClientProvider>
      </JourneyStoreProvider>
    </html>
  )
}
