/**
 * Subtle full-width audio-wave divider used between major sections of the
 * dark cinematic site. ~16px tall. Stroke fades into nothing at both edges,
 * with a faint goldsoft halo at the center peak. Uses the existing palette
 * (white + goldsoft) — no new colors. Decorative; aria-hidden.
 */
type Props = {
  className?: string;
};

export default function SoundwaveDivider({ className = "" }: Props) {
  return (
    <div
      className={`relative w-full select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 800 16"
        preserveAspectRatio="none"
        className="block h-4 w-full"
      >
        <defs>
          {/* Soft gold halo behind the center peak. */}
          <radialGradient id="sw-glow" cx="50%" cy="50%" r="20%">
            <stop offset="0%" stopColor="#C9A866" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C9A866" stopOpacity="0" />
          </radialGradient>
          {/* Cross-fade so the wave dissolves into the page at both edges. */}
          <linearGradient id="sw-fade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="20%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.32" />
            <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Center halo */}
        <circle cx="400" cy="8" r="80" fill="url(#sw-glow)" />
        {/* Audio waveform — symmetric peaks tightening toward center */}
        <path
          d="M0 8 L40 8 L60 6 L80 10 L100 4 L120 12 L140 5 L160 11
             L180 3 L200 13 L220 2 L240 14 L260 1 L280 15 L300 0
             L320 16 L340 0 L360 16 L380 1 L400 15 L420 1 L440 16
             L460 0 L480 16 L500 0 L520 15 L540 1 L560 14 L580 2
             L600 13 L620 3 L640 11 L660 5 L680 12 L700 4 L720 10
             L740 6 L760 8 L800 8"
          fill="none"
          stroke="url(#sw-fade)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
