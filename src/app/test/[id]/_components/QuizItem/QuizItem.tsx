import QuizTitle from "../QuizTitle/QuizTitle";
import QuizOption from "../QuizOption/QuizOption";
import s from "./QuizItem.module.css";

export default function QuizItem() {
  return (
    <div className={s.QuizItem}>
      <QuizTitle />
      <QuizOption />
    </div>
  );
}
