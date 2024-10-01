"use client";

import { useEffect, useMemo } from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import MajorCard from "@/components/MajorCard/MajorCard";
import Carousel from "@/components/Carousel/Carousel";
import s from "./Section01.module.css";
import { useResultStore } from "@/lib/stores";
import localmajorsData from "@/lib/data/majors.json";

export default function Section01() {
  /* useResultStore에서 필요한 상태와 함수 */
  const { setCurrentMajor, currentMajor, majors } = useResultStore();

  /**
   * 컴포넌트가 마운트되거나 majors, currentMajor, setCurrentMajor가 변경될 때 실행되는 useEffect
   * majors 객체에 학과가 있고, 현재 선택된 학과가 없다면 첫 번째 학과를 선택합니다.
   */
  useEffect(() => {
    const majorTitles = Object.keys(majors);
    if (majorTitles.length > 0 && !currentMajor) {
      setCurrentMajor(majorTitles[0]);
    }
  }, [majors, currentMajor, setCurrentMajor]);

  /**
   * 현재 선택된 학과의 데이터를 가져옵니다.
   * majors나 currentMajor가 변경될 때만 다시 계산합니다.
   */
  const currentMajorData = useMemo(() => {
    return majors[currentMajor];
  }, [majors, currentMajor]);

  /**
   * 현재 선택된 학과의 로컬 데이터를 가져옵니다.
   * currentMajor가 변경될 때만 다시 계산합니다.
   */
  const currentLocalMajorData = useMemo(() => {
    return localmajorsData.find((major) => major.major === currentMajor);
  }, [currentMajor]);

  /**
   * 캐러셀에 표시할 학과 카드 아이템들을 생성합니다.
   * majors가 변경될 때만 다시 생성합니다.
   */
  const majorItems = useMemo(() => {
    return Object.keys(majors).map((majorTitle, index) => (
      <MajorCard key={index} majorName={majorTitle} />
    ));
  }, [majors]);

  /**
   * 캐러셀에서 아이템이 변경될 때 호출되는 함수입니다.
   * 선택된 인덱스에 해당하는 학과를 현재 학과로 설정합니다.
   */
  const handleItemChange = (index: number) => {
    const majorTitles = Object.keys(majors);
    setCurrentMajor(majorTitles[index]);
  };

  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="01 학과순위"
          description="진우님과 가장 어울리는 학과는 다음과 같습니다!"
          color="white"
        />
        <div className={s.carouselContainer}>
          {/* 학과 캐러셀을 렌더링합니다. */}
          <Carousel
            items={majorItems}
            itemsToShow={1}
            onItemChange={handleItemChange}
          />
        </div>
        {/* 현재 선택된 학과 데이터가 있을 경우 해당 정보를 표시합니다. */}
        {currentMajorData && currentLocalMajorData && (
          <>
            <div className={s.taglineContainer}>
              <p className={s.tagline}>
                {/* 현재 학과의 summary를 표시합니다. */}
                {currentLocalMajorData.summary}
              </p>
            </div>
            <p className={s.description}>
              {/* 현재 학과의 description을 표시합니다. */}
              {currentLocalMajorData.description}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
