import s from "./SectionTitle.module.css";

export default function SectionTitle({
  title,
  description,
  color = "black",
}: {
  title: string;
  description: string;
  color?: "white" | "black";
}) {
  return (
    <div className={`${s.container} ${s[color]}`}>
      <h2 className={s.title}>{title}</h2>
      <p className={s.description}>{description}</p>
    </div>
  );
}
