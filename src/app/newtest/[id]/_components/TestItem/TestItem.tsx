import s from "./TestItem.module.css";

export default function TestItem({ questionId, question }) {
  return (
    <div className={s.TestItem}>
      <p className={s.questionId}>Q{questionId + 1}.</p>
      <p className={s.question}>{question}</p>
    </div>
  );
}
