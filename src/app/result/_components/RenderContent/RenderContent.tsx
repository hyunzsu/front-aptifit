import { CategoryData, DetailItem } from "@/lib/types";
import s from "./RenderContent.module.css";
import Card from "@/components/Card/Card";
import { Category } from "@/lib/constants/categories";
import { convertTo100Scale } from "../../../../lib/utils/scoreConversion";
import ResultChart from "../ResultChart/ResultChart";

type RenderContentProps = {
  categoryData: CategoryData;
  activeCategory: Category;
};

export default function RenderContent({
  categoryData,
  activeCategory,
}: RenderContentProps) {
  console.log(categoryData);
  return (
    <div className={s.categoryContent}>
      <div className={s.cardContainer}>
        <Card
          title={`A. 나의 ${activeCategory} 분포도`}
          description={
            <>
              {/* 분포도 - 차트 */}
              <ResultChart details={categoryData.details} />
              {/* 분포도 - 카드 */}
              <div className={s.detailGrid}>
                {categoryData.details.map((detail: DetailItem) => (
                  <div
                    key={`${detail.field}-${detail.score}`}
                    className={s.detail}
                  >
                    <div className={s.fieldContainer}>
                      <h3 className={s.field}>{detail.field}</h3>
                      <span className={s.score}>
                        {convertTo100Scale(detail.score)}점
                      </span>
                    </div>
                    <p className={s.content}>{detail.content}</p>
                  </div>
                ))}
              </div>
            </>
          }
        />
      </div>
      {/* 심층분석 */}
      <div className={s.description}>
        <Card
          title={`B. 나의 ${activeCategory} 심층분석`}
          description={categoryData.descriptions}
        />
      </div>
    </div>
  );
}
