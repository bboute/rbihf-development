"use client"

import { HeaderMenu } from "@/components/HeaderMenu"

export function HeroMenuOverlay() {
  return (
    <div className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6 lg:right-8">
      <HeaderMenu />
    </div>
  )
}