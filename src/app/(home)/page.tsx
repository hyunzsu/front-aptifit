import Image from "next/image";
import { MajorCardSlider } from "./_components";
import s from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={s.HomePage}>
      메인 페이지
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
