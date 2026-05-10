/**
 * Decorative vinyl record. SVG with concentric grooves and a gold center
 * label. Optionally spins on a slow loop (`spinning` prop).
 */
type Props = {
  size?: number;
  className?: string;
  spinning?: boolean;
};

export default function VinylMark({
  size = 96,
  className = "",
  spinning = false,
}: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${className} ${spinning ? "vinyl-spin" : ""}`}
      aria-hidden="true"
    >
      {/* Disc */}
      <circle cx="50" cy="50" r="49" fill="#0a0a0a" />
      <circle
        cx="50"
        cy="50"
        r="49"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="0.5"
      />
      {/* Concentric grooves */}
      {[44, 39, 34, 29, 24, 19].map((r) => (
        <circle
          key={r}
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.4"
        />
      ))}
      {/* Highlight sliver — gives the vinyl a sense of motion when spinning */}
      <path
        d="M 50 5 A 45 45 0 0 1 95 50"
        fill="none"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Gold label */}
      <circle cx="50" cy="50" r="14" fill="#A8854B" />
      <circle
        cx="50"
        cy="50"
        r="14"
        fill="none"
        stroke="rgba(0,0,0,0.2)"
        strokeWidth="0.5"
      />
      {/* Spindle hole */}
      <circle cx="50" cy="50" r="2" fill="#0a0a0a" />
    </svg>
  );
}
