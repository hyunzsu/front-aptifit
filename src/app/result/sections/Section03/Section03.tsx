"use client";

import { useMemo } from "react";
import SectionTitle from "@/components/sectionTitle/SectionTitle";
import s from "./Section03.module.css";
import SlideCategory from "../../_components/SlideCategory/SlideCategory";
import { useState } from "react";
import RenderContent from "../../_components/RenderContent/RenderContent";
import { useResultStore } from "@/lib/stores";
import {
  CATEGORIES,
  Category,
  CATEGORY_TO_KEY,
} from "@/lib/constants/categories";

type DetailItem = {
  field: string;
  score: number;
  content: string;
};

type CategoryData = {
  details: DetailItem[];
  descriptions: string[];
};

type ResultData = {
  [key: string]: CategoryData;
};

export default function Section03() {
  const { currentMajor, majors } = useResultStore();
  const [activeCategory, setActiveCategory] = useState<Category>(CATEGORIES[0]);

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
          description={`${currentMajor}을 선택한 진우님의 적성을 분석한 상세 리포트를 살펴보세요!`}
          color="black"
        />
        <SlideCategory
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        {resultData[CATEGORY_TO_KEY[activeCategory]] && (
          <RenderContent
            categoryData={resultData[CATEGORY_TO_KEY[activeCategory]]}
            activeCategory={activeCategory}
          />
        )}
      </div>
    </section>
  );
}
