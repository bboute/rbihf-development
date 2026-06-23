import type { JSX } from "react"
import Link from "next/link"
import { clubDevelopmentOrder, clubDevelopmentStages } from "@/lib/clubDevelopment"

export default function CurriculumPage(): JSX.Element {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">
          Club Development Curriculum
        </h1>
        <p className="text-gray-600 max-w-3xl">
          Age-specific curriculum pages extend the public Club Development framework with coach-facing guides, deeper teaching material, and implementation detail for each stage.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {clubDevelopmentOrder.map((slug) => {
          const stage = clubDevelopmentStages[slug]!

          return (
            <Link
              key={slug}
              href={`/portal/curriculum/${slug}`}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                {stage.ageRange}
              </p>
              <h2 className="mt-3 text-2xl font-bold text-gray-900">
                {stage.label} Curriculum
              </h2>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Coach-facing curriculum guidance connected to the public pathway, including session design, standards, and role-based resources.
              </p>
              <div className="mt-6 text-sm font-medium text-blue-700 group-hover:text-blue-800">
                Open curriculum →
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
