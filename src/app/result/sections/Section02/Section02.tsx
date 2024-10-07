"use client";
import React, { useMemo } from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import Card from "@/components/Card/Card";
import Accordion from "@/components/Accordion/Accordion";
import s from "./Section02.module.css";
import { useResultStore } from "@/lib/stores";
import majorsData from "@/lib/data/majors.json";

// majorsData의 타입을 정의합니다.
type MajorData = {
  major: string;
  description: string;
  summary: string;
  id: number;
  definition: string;
  ideal_candiate: string;
  curriculum: string;
  sub_major: string;
};

export default function Section02({ name }: { name: string }) {
  /**
   * useResultStore에서 현재 선택된 학과 정보를 가져옵니다.
   */
  const { currentMajor, majors } = useResultStore();

  /**
   * 현재 선택된 학과의 데이터를 가져옵니다.
   * majors나 currentMajor가 변경될 때만 다시 계산합니다.
   */
  const currentMajorData = useMemo(() => {
    return majors[currentMajor];
  }, [majors, currentMajor]);

  /**
   * 로컬 JSON 데이터에서 현재 학과의 추가 정보를 찾습니다.
   * currentMajor가 변경될 때만 다시 계산합니다.
   */
  const localMajorData = useMemo(() => {
    return (majorsData as MajorData[]).find(
      (major) => major.major === currentMajor
    );
  }, [currentMajor]);

  /**
   * 카드 데이터를 생성합니다.
   * localMajorData가 변경될 때만 다시 계산합니다.
   */
  const cardData = useMemo(() => {
    const fields = [
      { id: 1, title: "A. 학과설명", key: "definition" },
      { id: 2, title: "B. 인재상", key: "ideal_candiate" },
      { id: 3, title: "C. 심화분야", key: "sub_major" },
      { id: 4, title: "D. 커리큘럼", key: "curriculum" },
    ];
    const defaultMessage =
      "결과지 정보가 없습니다. 새로고침해도 문제가 발생할 경우 관리자에게 문의해주세요.";

    return fields.map(({ id, title, key }) => ({
      id,
      title,
      description: localMajorData
        ? (localMajorData[key as keyof MajorData] as string) || defaultMessage
        : defaultMessage,
    }));
  }, [localMajorData]);

  /**
   * 아코디언 데이터를 생성합니다.
   * cardData가 변경될 때만 다시 계산합니다.
   */
  const accordionData = useMemo(
    () =>
      cardData.map((item) => ({
        id: item.id,
        question: item.title,
        answer: item.description,
      })),
    [cardData]
  );

  // 현재 선택된 학과 데이터가 없는 경우 로딩 메시지를 표시합니다.
  if (!currentMajorData || !localMajorData) {
    return <div>Loading...</div>;
  }

  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="02 학과소개"
          description={`${currentMajor}의 A to Z, ${name}님을 위해 쉽게 정리했어요!`}
          color="white"
        />
        {/* Desktop view */}
        <div className={s.desktopView}>
          <div className={s.cardContainer}>
            {/* 카드 데이터를 기반으로 Card 컴포넌트를 렌더링합니다. */}
            {cardData.map((card) => (
              <Card
                key={card.id}
                title={card.title}
                description={card.description}
                className={s.card}
              />
            ))}
          </div>
        </div>
        {/* Mobile view */}
        <div className={s.mobileView}>
          {/* 모바일 뷰에서는 Accordion 컴포넌트를 사용하여 데이터를 표시합니다. */}
          <Accordion examples={accordionData} />
        </div>
      </div>
    </section>
  );
}
