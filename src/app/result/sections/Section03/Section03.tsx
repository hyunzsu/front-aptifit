"use client";

import { useMemo } from "react";
import { useResultStore } from "@/lib/stores";
import { CATEGORIES, CATEGORY_TO_KEY } from "@/lib/constants/categories";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import SlideCategory from "../../_components/SlideCategory/SlideCategory";
import RenderContent from "../../_components/RenderContent/RenderContent";
import s from "./Section03.module.css";

// 세부 항목 타입 정의
type DetailItem = {
  field: string;
  score: number;
  content: string;
};

// 카테고리 데이터 타입 정의
type CategoryData = {
  details: DetailItem[];
  descriptions: string[];
};

// 전체 결과 데이터 타입 정의
type ResultData = {
  [key: string]: CategoryData;
};

export default function Section03({ name }: { name: string }) {
  // useResultStore에서 필요한 상태와 함수들을 가져옵니다.
  // currentCategory와 setCurrentCategory는 새로 추가된 항목입니다.
  const { currentMajor, majors, currentCategory, setCurrentCategory } =
    useResultStore();

  // 현재 선택된 전공의 결과 데이터를 가공합니다.
  // useMemo를 사용하여 불필요한 재계산을 방지합니다.
  const resultData: ResultData = useMemo(() => {
    const currentMajorData = majors[currentMajor];
    if (!currentMajorData) return {} as ResultData;

    return currentMajorData.result;
  }, [currentMajor, majors]);

  return (
    <section className={s.section}>
      <div className={s.sectionContainer}>
        <SectionTitle
          title="03 나의 5대 적성요소 분석"
          description={`${currentMajor}을 추천받은 ${name}님의 적성을 분석한 상세 리포트를 살펴보세요!`}
          color="black"
        />
        {/* SlideCategory 컴포넌트에 현재 카테고리와 카테고리 변경 함수를 전달합니다. */}
        <SlideCategory
          categories={CATEGORIES}
          activeCategory={currentCategory}
          onCategoryChange={setCurrentCategory}
        />
        {/* 선택된 카테고리에 해당하는 데이터가 있을 경우에만 RenderContent를 렌더링합니다. */}
        {resultData[CATEGORY_TO_KEY[currentCategory]] && (
          <RenderContent
            categoryData={resultData[CATEGORY_TO_KEY[currentCategory]]}
            activeCategory={currentCategory}
          />
        )}
      </div>
    </section>
  );
}
