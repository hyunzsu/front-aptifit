"use client";

import React, { useState } from "react";
import a from "@/app/styles/modules/a11y.module.css";
import s from "./QuizOption.module.css";

/* 라디오 버튼 value, label */
const options = [
  { value: 1, label: "전혀 그렇지 않다" },
  { value: 2, label: "그렇지 않다" },
  { value: 3, label: "약간 그렇지 않다" },
  { value: 4, label: "보통이다" },
  { value: 5, label: "약간 그렇다" },
  { value: 6, label: "그렇다" },
  { value: 7, label: "매우 그렇다" },
];

/* 모바일과 웹사이즈 라디오 버튼 크기 */
const mobileSizes = [32, 28, 24, 20, 24, 28, 32];
const desktopSizes = [60, 50, 40, 30, 40, 50, 60];

export default function QuizOption() {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);

  const handleChange = (value: number) => {
    setSelectedValue(value);
  };

  return (
    <div className={s.quizOptionContainer}>
      <div className={s.optionContainer}>
        {options.map((option, index) => (
          <div key={option.value} className={s.optionWrapper}>
            <label className={s.optionLabel}>
              <input
                type="radio"
                name="quizOption"
                value={option.value}
                checked={selectedValue === option.value}
                onChange={() => handleChange(option.value)}
                className={s.hiddenRadio}
              />
              <span
                className={s.customRadio}
                style={
                  {
                    "--mobile-size": `${mobileSizes[index]}px`,
                    "--desktop-size": `${desktopSizes[index]}px`,
                  } as React.CSSProperties
                }
              >
                {selectedValue === option.value && (
                  <span className={s.checkmark}>✓</span>
                )}
              </span>
              <span className={a.a11y}>{option.label}</span>
            </label>
          </div>
        ))}
      </div>
      <div className={s.textContainer}>
        <span className={s.visibleText}>{options[0].label}</span>
        <span className={s.visibleText}>
          {options[options.length - 1].label}
        </span>
      </div>
    </div>
  );
}
