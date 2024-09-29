import s from "./TestItem.module.css";

export default function TestItem() {
  return (
    <div className={s.TestItem}>
      <p className={s.title}>
        주말 저녁, 업무 관련 책을 읽기보다는 나를 위한 시간을 보내고 싶다
      </p>
    </div>
  );
}
