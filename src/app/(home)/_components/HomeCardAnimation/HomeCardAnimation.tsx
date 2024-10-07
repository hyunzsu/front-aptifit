"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { MajorCardsSlider } from "@/app/(home)/_components";
import s from "./HomeCardAnimation.module.css";

export default function HomeCardAnimation() {
  const [randomNum, setRandomNum] = useState(1);

  useEffect(() => {
    const generateRandomNum = () => {
      const num = Math.floor(Math.random() * 5) + 1;
      setRandomNum(num);
    };

    generateRandomNum(); // 컴포넌트가 처음 렌더링될 때 랜덤 숫자 생성

    // 필요한 경우, 랜덤 숫자를 주기적으로 생성하려면 setInterval 사용 가능
    // const interval = setInterval(generateRandomNum, 1000); // 예: 1초마다 숫자 변경

    // return () => clearInterval(interval); // cleanup 함수
  }, []);

  const iphoneSrc = `/svg/iphone${randomNum}.svg`;

  return (
    <div className={s.HomeCardAnimation}>
      <Image
        className={s.iphone}
        src={iphoneSrc}
        width={320}
        height={466}
        alt="아이폰"
      />
      <MajorCardsSlider />
    </div>
  );
}
