import s from "./Percentage.module.css";

export default function Percentage({ responses }) {
  // 0이 아닌 응답의 개수를 계산
  const completedCount = responses.filter((response) => response !== 0).length;

  // 전체 응답 중 완료된 비율 계산
  const progressPercentage = Math.floor(
    (completedCount / responses.length) * 100
  );

  return (
    <div className={s.Percentage}>
      <span className={s.score}>{progressPercentage}</span>%
    </div>
  );
}
