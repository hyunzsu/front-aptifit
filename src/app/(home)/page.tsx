import Image from "next/image";
import { MajorCardSlider } from "./_components";
import s from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={s.HomePage}>
      <div className={s.titleContainer}>
        <p className={s.subtitle}>AI 기반 진단도구로 쉽고 빠르게</p>
        <p className={s.title}>너만의 전공적성을 찾아봐!</p>
        <button className={s.button}>시작하기</button>
      </div>
      <Image
        className={s.iphone}
        src="/imgs/iphone.png"
        alt="아이폰"
        width={320}
        height={727}
      />
      <div className={s.cardAnimationContainer}>
        <MajorCardSlider />
      </div>
    </main>
  );
}
