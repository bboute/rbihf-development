"use client";

import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

interface OverlappingImageFeatureProps {
  imageUrl: string;
  imageAlt: string;
  imageObjectPosition?: string;
  imageIsLeft: boolean;
  caption?: string | null;
  children: ReactNode;
}

export function OverlappingImageFeature({
  imageUrl,
  imageAlt,
  imageObjectPosition,
  imageIsLeft,
  caption,
  children,
}: OverlappingImageFeatureProps) {
  const featureRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: featureRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
  });
  const parallaxProgress = reduceMotion ? scrollYProgress : smoothProgress;
  const imageY = useTransform(
    parallaxProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-30, 30],
  );
  const panelY = useTransform(
    parallaxProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [18, -18],
  );

  return (
    <motion.figure ref={featureRef} className="group relative w-full">
      <div
        className={`relative aspect-[4/3] overflow-hidden rounded-md bg-muted shadow-[0_20px_55px_rgba(21,46,53,0.2)] lg:w-2/3 ${
          imageIsLeft ? "lg:mr-auto" : "lg:ml-auto"
        }`}
      >
        <motion.div
          style={{ y: imageY, scale: reduceMotion ? 1 : 1.12 }}
          className="absolute inset-0"
        >
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 66vw"
            className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.035] motion-reduce:transition-none"
            style={{ objectPosition: imageObjectPosition }}
          />
        </motion.div>
      </div>
      {caption?.trim() && (
        <figcaption
          className={`mt-4 border-l-2 border-secondary pl-4 text-sm leading-6 text-muted-foreground lg:w-2/3 ${
            imageIsLeft ? "lg:mr-auto" : "lg:ml-auto"
          }`}
        >
          {caption}
        </figcaption>
      )}
      <motion.div
        style={{ y: panelY }}
        className={`relative z-10 mx-4 mt-8 sm:mx-8 lg:absolute lg:mx-0 lg:mt-0 lg:w-1/2 lg:max-w-xl ${
          imageIsLeft ? "lg:right-0 lg:top-[58%]" : "lg:left-0 lg:top-[42%]"
        }`}
      >
        <div className="lg:-translate-y-1/2">
          <div className="bg-[#152E35] px-6 py-7 text-white [--foreground:#ffffff] [--secondary:#F08992] [--muted-foreground:#c4cdd0] shadow-[0_24px_60px_rgba(21,46,53,0.3)] transition-shadow duration-500 motion-safe:group-hover:shadow-[0_30px_75px_rgba(21,46,53,0.36)] motion-reduce:transition-none sm:px-8 sm:py-9 lg:px-10 lg:py-10">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.figure>
  );
}
