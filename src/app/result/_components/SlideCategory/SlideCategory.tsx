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
  return (
    <div className={s.tabNavigation}>
      {categories.map((category) => (
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
