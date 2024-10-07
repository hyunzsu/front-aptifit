"use client";

import s from "./SectionTitle.module.css";

export default function SectionTitle({
  title,
  description,
  color = "black",
  className,
}: {
  title: string;
  description: string;
  color?: "white" | "black";
  className?: string;
}) {
  return (
    <div className={`${s.container} ${s[color]} ${className || ""}`}>
      <h2 className={s.title}>{title}</h2>
      <p className={s.description}>{description}</p>
    </div>
  );
}
