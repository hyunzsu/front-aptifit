"use client";

import { useParams } from "next/navigation";
import a from "@/app/styles/modules/a11y.module.css";
import s from "./TestOption.module.css";

const options = [
  { value: 1, label: "전혀 그렇지 않다" },
  { value: 2, label: "그렇지 않다" },
  { value: 3, label: "약간 그렇지 않다" },
  { value: 4, label: "보통이다" },
  { value: 5, label: "약간 그렇다" },
  { value: 6, label: "그렇다" },
  { value: 7, label: "매우 그렇다" },
];

export default function TestOption({
  questionId,
  responses,
  setResponses,
  onNext,
}) {
  const { id } = useParams();

  const handleValueChange = (e) => {
    // responses 상태변수 업데이트
    const newResponses = [...responses];
    newResponses[questionId] = parseInt(e.target.value);
    setResponses(newResponses);

    // 세션스토리지에 저장된 responses 값 업데이트
    const savedData = JSON.parse(sessionStorage.getItem(`aptifit${id}`));
    const newSavedData = {
      ...savedData,
      responses: newResponses,
    };

    sessionStorage.setItem(`aptifit${id}`, JSON.stringify(newSavedData));

    onNext();
  };

  return (
    <div className={s.TestOption}>
      {options.map((option, index) => {
        const { value, label } = option;

        /* 버튼 사이즈 조정 */
        let sizeClass = s.radioSmall;

        if (value === 1 || value === 7) {
          sizeClass = s.radioLarge;
        } else if (value === 2 || value === 6) {
          sizeClass = s.radioMediumLarge;
        } else if (value === 3 || value === 5) {
          sizeClass = s.radioMedium;
        }

        return (
          <div key={index} className={s.option}>
            <input
              className={`${s.radio} ${sizeClass}`}
              type="radio"
              value={value}
              name={`question-${questionId}`}
              checked={responses[questionId] === value}
              onChange={handleValueChange}
            />
            <label className={a.a11y} htmlFor="">
              {label}
            </label>
            {value === 1 && (
              <p className={`${s.label} ${s.labelLeft}`}>전혀 그렇지 않다</p>
            )}
            {value === 7 && (
              <p className={`${s.label} ${s.labelRight}`}>매우 그렇다</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
