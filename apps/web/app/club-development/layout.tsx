import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { isClubDevelopmentEnabled } from "@/lib/featureFlags"

export default function ClubDevelopmentLayout({
  children,
}: {
  children: ReactNode
}) {
  if (!isClubDevelopmentEnabled) {
    notFound()
  }

  return children
}