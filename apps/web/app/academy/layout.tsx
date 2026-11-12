import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { isAcademyEnabled } from "@/lib/featureFlags"

export default function AcademyLayout({ children }: { children: ReactNode }) {
  if (!isAcademyEnabled) {
    notFound()
  }

  return children
}