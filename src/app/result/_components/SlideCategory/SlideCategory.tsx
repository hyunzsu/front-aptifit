import { CATEGORIES, Category } from "@/lib/constants/categories";
import s from "./SlideCategory.module.css";

type SlideCategoryProps = {
  categories: typeof CATEGORIES;
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
};

export default function SlideCategory({
  categories,
  activeCategory,
  onCategoryChange,
}: SlideCategoryProps) {
  const newArray = [
    categories[4], // 흥미
    categories[0], // 역량
    categories[1], // 가치
    categories[2], // 개인특성
    categories[3], // 지식
  ];

  return (
    <div className={s.tabNavigation}>
      {newArray.map((category) => (
        <button
          key={category}
          className={`${s.tabButton} ${
            activeCategory === category ? s.active : ""
          }`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
