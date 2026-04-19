"use client";

import { useScrollAnimation, useReducedMotion } from "@/lib/hooks/useScrollAnimation";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeIn" | "fadeInUp" | "slideInLeft" | "slideInRight" | "scaleIn";
  delay?: number;
  id?: string;
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fadeInUp",
  delay = 0,
  id,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>();
  const prefersReducedMotion = useReducedMotion();

  const animations = {
    fadeIn: "animate-fadeIn",
    fadeInUp: "animate-fadeInUp",
    slideInLeft: "animate-slideInLeft",
    slideInRight: "animate-slideInRight",
    scaleIn: "animate-fadeInScale",
  };

  const animationClass = prefersReducedMotion ? "" : animations[animation];
  const delayStyle = delay > 0 ? { animationDelay: `${delay}s` } : {};

  return (
    <div
      ref={ref}
      id={id}
      className={`${className} ${isVisible ? animationClass : "opacity-0"}`}
      style={{
        ...delayStyle,
        animationFillMode: "forwards",
      }}
    >
      {children}
    </div>
  );
}
