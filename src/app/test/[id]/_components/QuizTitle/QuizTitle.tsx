import s from "./QuizTitle.module.css";

export default function QuizTitle() {
  return (
    <div className={s.QuizTitle}>
      <p className={s.QuizNumber}>Q1.</p>
      <p className={s.QuizContent}>
        주말 저녁, 업무 관련 책을 읽기보다는 나를 위한 시간을 보내고 싶다.
      </p>
    </div>
  );
}
