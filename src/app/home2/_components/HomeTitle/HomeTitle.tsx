import { Button } from "@/components";
import s from "./HomeTitle.module.css";

export default function HomeTitle() {
  return (
    <div className={s.HomeTitle}>
      <p className={s.subtitle}>AI 기반 진단도구로 쉽고 빠르게</p>
      <p className={s.title}>너만의 전공적성을 찾아봐</p>
      <Button
        // disabled={testLoading || resultLoading}
        label="시작하기"
        type="button"
        pageType="main"
        // onClick={startTest}
      />
    </div>
  );
}
