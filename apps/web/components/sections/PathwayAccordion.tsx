"use client";

import { useState, type JSX } from "react";
import Link from "next/link";
import Image from "next/image";

export interface PathwayStage {
  _id: string;
  title: string;
  slug: string;
  ageRange?: string;
  description?: string;
  image?: string | null;
}

function StageContent({ stage }: { stage: PathwayStage }) {
  return (
    <div className="flex h-full w-full max-w-2xl flex-col justify-between px-8 pb-10 pt-8 text-white lg:px-12 lg:pb-12 lg:pt-10">
      <div>
        {stage.ageRange && (
          <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
            {stage.ageRange}
          </p>
        )}
        <h3 className="mt-5 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {stage.title}
        </h3>
        {stage.description && (
          <p className="mt-4 max-w-xl text-base leading-7 text-white/80">
            {stage.description}
          </p>
        )}
      </div>
      <Link
        href={`/club-development/${stage.slug}`}
        className="group/link inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-white/90"
      >
        View the {stage.title.split(" ")[0]} overview
        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover/link:translate-x-1"
        >
          →
        </span>
      </Link>
    </div>
  );
}

export function PathwayAccordion({ stages }: { stages: PathwayStage[] }): JSX.Element {
  const [activeStage, setActiveStage] = useState<string>(stages[0]?.slug ?? "");

  return (
    <section id="pathway" className="section-rhythm bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Development that changes with the player.
          </h2>
          <p className="max-w-md text-base leading-7 text-muted-foreground lg:justify-self-end">
            The framework sets age-appropriate priorities while keeping skill
            development continuous. Select a stage to understand what matters
            now.
          </p>
        </div>

        {/* Desktop: horizontal expanding panels */}
        <div className="mt-12 hidden gap-3 lg:flex">
          {stages.map((stage) => {
            const isActive = activeStage === stage.slug;
            return (
              <article
                key={stage._id}
                onClick={() => setActiveStage(stage.slug)}
                style={{ flexGrow: isActive ? 5 : 0, flexBasis: isActive ? "38rem" : "72px" }}
                className={`group relative h-[30rem] shrink grow-0 cursor-pointer overflow-hidden rounded-3xl border transition-[flex-grow,flex-basis,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? "border-transparent bg-white shadow-[0_24px_70px_rgba(0,87,107,0.12)]"
                    : "border-border hover:border-primary/25"
                }`}
              >
                {/* Background image: covers collapsed rail in B&W, brightens on hover; visible color backdrop when open */}
                {stage.image && (
                  <div aria-hidden="true" className="absolute inset-0">
                    <Image
                      src={stage.image}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className={`object-cover transition-[filter,opacity] duration-700 ${
                        isActive
                          ? "opacity-100 grayscale"
                          : "opacity-100 grayscale group-hover:brightness-110 group-hover:grayscale-0"
                      }`}
                    />
                    <span
                      className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35 transition-opacity duration-700 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                    <span
                      className={`absolute inset-0 bg-black transition-opacity duration-700 ${
                        isActive ? "opacity-0" : "opacity-25"
                      }`}
                    ></span>
                  </div>
                )}

                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`stage-content-${stage.slug}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveStage(stage.slug);
                  }}
                  className={`flex h-16 w-full items-center justify-center transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-white hover:text-white"
                  }`}
                >
                  <span
                    className={`font-heading text-lg font-bold tracking-tight transition-transform duration-500 ${
                      isActive ? "" : "lg:[writing-mode:vertical-rl] lg:rotate-180"
                    }`}
                  >
                    {stage.title}
                  </span>
                </button>

                <div
                  id={`stage-content-${stage.slug}`}
                  className={`relative z-10 transition-opacity duration-500 ${
                    isActive ? "opacity-100 delay-200" : "opacity-0"
                  }`}
                >
                  {/* Fixed-width inner so text doesn't reflow during the width animation */}
                  <div className="w-[38rem]">
                    <StageContent stage={stage} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile / tablet: stacked accordion */}
        <div className="mt-12 flex flex-col gap-3 lg:hidden">
          {stages.map((stage) => {
            const isActive = activeStage === stage.slug;
            return (
              <article
                key={stage._id}
                className={`group relative overflow-hidden rounded-3xl border transition-colors duration-300 ${
                  isActive
                    ? "border-primary/15 bg-white shadow-[0_24px_70px_rgba(0,87,107,0.12)]"
                    : "border-border"
                }`}
              >
                {stage.image && (
                  <div aria-hidden="true" className="absolute inset-0">
                    <Image
                      src={stage.image}
                      alt=""
                      fill
                      sizes="100vw"
                      className={`object-cover transition-[filter,opacity] duration-500 ${
                        isActive
                          ? "opacity-25 grayscale-0"
                          : "opacity-100 grayscale group-hover:brightness-110 group-hover:grayscale-0"
                      }`}
                    />
                    <span
                      className={`absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-white/30 transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    ></span>
                    <span
                      className={`absolute inset-0 bg-black transition-opacity duration-300 ${
                        isActive ? "opacity-0" : "opacity-25"
                      }`}
                    ></span>
                  </div>
                )}
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`stage-content-${stage.slug}`}
                  onClick={() => setActiveStage(stage.slug)}
                  className="relative flex w-full items-center justify-between p-5 text-left"
                >
                  <span className="relative font-heading text-lg font-bold tracking-tight text-foreground">
                    {stage.title}
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative text-muted-foreground transition-transform duration-300 ${
                      isActive ? "rotate-180" : ""
                    }`}
                  >
                    ↓
                  </span>
                </button>
                <div
                  id={`stage-content-${stage.slug}`}
                  className={`relative z-10 grid transition-[grid-template-rows] duration-500 ease-out ${
                    isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <StageContent stage={stage} />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
