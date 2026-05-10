/**
 * Tiny animated equalizer — looks like a "now playing" indicator.
 * Pure CSS animation (defined as `eq-bar` in globals.css), no JS.
 *
 *   <EqBars className="text-gold" />        // gold bars
 *   <EqBars barCount={4} className="h-4" /> // taller, four bars
 */
type Props = {
  className?: string;
  barCount?: number;
};

export default function EqBars({ className = "", barCount = 3 }: Props) {
  return (
    <span
      className={`inline-flex h-3 items-end gap-[2px] ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: barCount }, (_, i) => (
        <span
          key={i}
          className="block w-[2px] rounded-full bg-current"
          style={{
            height: "30%",
            animation: `eq-bar 1s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </span>
  );
}
