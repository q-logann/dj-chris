import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div" | "header" | "footer" | "main";
  bg?: "cream" | "ivory" | "mist";
};

export default function Section({
  children,
  className = "",
  id,
  as: Tag = "section",
  bg = "cream",
}: Props) {
  const bgClass =
    bg === "ivory" ? "bg-ivory" : bg === "mist" ? "bg-mist/40" : "bg-cream";
  return (
    <Tag id={id} className={`${bgClass} ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        {children}
      </div>
    </Tag>
  );
}
