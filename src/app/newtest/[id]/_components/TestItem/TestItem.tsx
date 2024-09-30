import s from "./TestItem.module.css";

export default function TestItem({ question }) {
  return (
    <div className={s.TestItem}>
      <p className={s.title}>{question}</p>
    </div>
  );
}
