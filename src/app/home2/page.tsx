import { Navigation } from "@/components";
import { HomeTitle, HomeCardAnimation } from "@/app/home2/_components";
import s from "./HomePage.module.css";

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main className={s.HomePage}>
        {/* 1. 제목 */}
        <HomeTitle />

        {/* 2. 이미지 슬라이드 */}
        <HomeCardAnimation />
      </main>
    </>
  );
}
