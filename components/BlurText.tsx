"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Word-by-word blur-in headline. Each word becomes an inline-block <span>
 * that animates via the `fade-blur-in` keyframe in globals.css. An
 * IntersectionObserver triggers the animation when the headline is at least
 * 10% in view. No CSS transitions, no Framer Motion — pure CSS keyframes.
 */
type Props = {
  text: string;
  /** ClassName applied to the wrapping <p> (typography, sizing, color). */
  className?: string;
  /** Initial delay (ms) added before the first word starts animating. */
  startDelayMs?: number;
  /** Per-word stagger in ms. Default 100. */
  stepMs?: number;
};

export default function BlurText({
  text,
  className = "",
  startDelayMs = 0,
  stepMs = 100,
}: Props) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Synchronous in-view check — handles the common case where the
    // element is already visible at mount (e.g. above-the-fold hero
    // headline). This is more reliable than waiting for the
    // IntersectionObserver, which can lag or skip in some environments.
    const rect = el.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInView) {
      setVisible(true);
      return;
    }

    // Otherwise wait for the element to scroll into view.
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={className}
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        rowGap: "0.1em",
      }}
    >
      {words.map((word, i) => {
        const delaySec = (startDelayMs + i * stepMs) / 1000;
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              marginRight: "0.28em",
              // Initial state matches keyframe 0% so there's no flash before
              // the animation runs.
              opacity: visible ? undefined : 0,
              filter: visible ? undefined : "blur(10px)",
              transform: visible ? undefined : "translateY(50px)",
              animation: visible
                ? `fade-blur-in 0.7s ${delaySec}s ease-out both`
                : undefined,
            }}
          >
            {word}
          </span>
        );
      })}
    </p>
  );
}
