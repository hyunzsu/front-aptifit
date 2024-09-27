import { ResultData } from "@/lib/types";

// 카테고리 정의
export const CATEGORIES = ["역량", "가치", "개인특성", "지식", "흥미"] as const;
export type Category = (typeof CATEGORIES)[number];

// 카테고리와 ResultData 키 매핑
export const CATEGORY_TO_KEY: Record<Category, keyof ResultData> = {
  역량: "strength",
  가치: "value",
  개인특성: "characteristic",
  지식: "knowledge",
  흥미: "interests",
};
