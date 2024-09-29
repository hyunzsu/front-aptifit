/* Accordion 타입 */
export type AccordionTable = {
  id: number;
  question: string;
  answer: string;
};

/* ResultData 타입 */
export type ResultData = {
  strength: CategoryData;
  value: CategoryData;
  characteristic: CategoryData;
  knowledge: CategoryData;
  interests: CategoryData;
};

/* CategoryData 타입 */
export type CategoryData = {
  details: DetailItem[];
  descriptions: string[];
};

/* DetailItem 타입 */
export type DetailItem = {
  field: string;
  score: number;
  content: string;
};
