"use client";

import {useLayoutEffect, useRef, type ReactNode} from "react";
import styles from "./direction.module.css";

export default function Reveal({children, className = ""}: {children: ReactNode; className?: string}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = reduce || node.getBoundingClientRect().top < window.innerHeight * 0.92;
    if (seen) {
      node.dataset.in = "true";
      return;
    }
    node.dataset.out = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.dataset.in = "true";
        observer.disconnect();
      },
      {threshold: 0.08},
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.reveal} ${className}`.trim()}>
      {children}
    </div>
  );
}
