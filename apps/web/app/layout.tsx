import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Lato, Urbanist, Geist_Mono } from "next/font/google"

import "@workspace/ui/globals.css"
import { Providers } from "@/components/providers"
import { Footer } from "@/components/layout/Footer"
import { ConditionalHeader } from "@/components/layout/ConditionalHeader"

const fontBody = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-sans",
})

const fontHeading = Urbanist({
  subsets: ["latin"],
  variable: "--font-heading",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "RBIHF Development Centre of Excellence",
  description: "RBIHF Development Centre of Excellence (RDCE) for Belgian ice hockey",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontBody.variable} ${fontHeading.variable} ${fontMono.variable} font-sans antialiased `}
      >
        <Providers>
          <ConditionalHeader />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
