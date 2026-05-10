"use client";

import { useEffect, useRef } from "react";

/**
 * Background video with a custom rAF crossfade — no CSS transitions.
 *
 * Behavior (matches the cinematic landing-page spec):
 *   - Starts at opacity 0; fades to 1 on `loadeddata`.
 *   - Begins fading out FADE_OUT_LEAD seconds before the video ends.
 *   - Resets to currentTime=0 on `ended` and fades back in (manual loop).
 *   - Each fadeTo() cancels the previous rAF so opacity tweens compose cleanly.
 */
const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55; // seconds before end to start fading out

type Props = {
  src: string;
  poster?: string;
  className?: string;
  style?: React.CSSProperties;
};

export default function FadingVideo({ src, poster, className, style }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const cancelRaf = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const fadeTo = (target: number, duration = FADE_MS) => {
      cancelRaf();
      const start = performance.now();
      const from = parseFloat(video.style.opacity || "0");
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = t; // linear is fine here; visual difference is negligible
        video.style.opacity = String(from + (target - from) * eased);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          rafRef.current = null;
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    const onLoadedData = () => {
      video.style.opacity = "0";
      void video.play().catch(() => {
        /* autoplay blocked — leave opacity at 0 */
      });
      fadeTo(1);
    };

    const onTimeUpdate = () => {
      if (fadingOutRef.current) return;
      const remaining = video.duration - video.currentTime;
      if (remaining > 0 && remaining <= FADE_OUT_LEAD) {
        fadingOutRef.current = true;
        fadeTo(0);
      }
    };

    const onEnded = () => {
      video.style.opacity = "0";
      window.setTimeout(() => {
        video.currentTime = 0;
        void video.play().catch(() => undefined);
        fadingOutRef.current = false;
        fadeTo(1);
      }, 100);
    };

    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);

    return () => {
      cancelRaf();
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      style={{ opacity: 0, ...style }}
    />
  );
}
