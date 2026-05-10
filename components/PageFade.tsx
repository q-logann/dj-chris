"use client";

import { usePathname } from "next/navigation";
import { type ReactNode } from "react";

/**
 * Re-keys its children on every pathname change so the `page-fade` CSS
 * animation runs fresh on each navigation. No transition library needed —
 * pure CSS keyframe + React's existing reconciliation behavior.
 */
export default function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  );
}
