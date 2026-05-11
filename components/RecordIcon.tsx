/**
 * Line-art record icon — small, elegant, family-friendly. Two-tone using the
 * existing `gold` (#A8854B) and `goldsoft` (#C9A866) palette. No fill. The
 * faint diagonal line is a hint of a tone-arm. Decorative; aria-hidden.
 */
type Props = {
  size?: number;
  className?: string;
};

export default function RecordIcon({ size = 36, className = "" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Outer rim — gold */}
      <circle cx="18" cy="18" r="16" stroke="#A8854B" strokeWidth="1.5" />
      {/* Two grooves — gold-soft */}
      <circle
        cx="18"
        cy="18"
        r="12"
        stroke="#C9A866"
        strokeWidth="0.8"
        strokeOpacity="0.6"
      />
      <circle
        cx="18"
        cy="18"
        r="9"
        stroke="#C9A866"
        strokeWidth="0.8"
        strokeOpacity="0.5"
      />
      {/* Center label */}
      <circle cx="18" cy="18" r="4.5" stroke="#A8854B" strokeWidth="1.5" />
      {/* Spindle dot */}
      <circle cx="18" cy="18" r="0.9" fill="#A8854B" />
      {/* Tone-arm hint */}
      <line
        x1="32"
        y1="6"
        x2="22"
        y2="16"
        stroke="#A8854B"
        strokeWidth="1"
        strokeOpacity="0.4"
        strokeLinecap="round"
      />
    </svg>
  );
}
