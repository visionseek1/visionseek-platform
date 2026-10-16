"use client";

import {useEffect, useRef, type ReactNode} from "react";
import styles from "./direction.module.css";

export default function Reveal({children, className = ""}: {children: ReactNode; className?: string}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.dataset.in = "true";
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.dataset.in = "true";
        observer.disconnect();
      },
      {threshold: 0.18},
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
