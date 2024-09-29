"use client";

import { useState } from "react";
import Image from "next/image";
import s from "./CombinedDropdownFilter.module.css";

export default function CombinedDropdownFilter({
  defaultValue1,
  defaultValue2,
  data1,
  data2,
  setState,
}) {
  const [selectedValue1, setSelectedValue1] = useState(defaultValue1);
  const [isFilter1Active, setIsFilter1Active] = useState(false);

  const [selectedValue2, setSelectedValue2] = useState(defaultValue2);
  const [isFilter2Active, setIsFilter2Active] = useState(false);

  const handleFilter1Active = () => {
    setIsFilter1Active(!isFilter1Active);
  };

  const handleFilter2Active = () => {
    setIsFilter2Active(!isFilter2Active);
  };

  const handleSelectedValue1 = (e) => {
    setSelectedValue1(e.target.textContent);
    setIsFilter1Active(false);
    setSelectedValue2(defaultValue2); // 첫 번째 드롭다운이 변경되면 두 번째 드롭다운을 초기화
  };

  const handleSelectedValue2 = (e) => {
    setSelectedValue2(e.target.textContent);
    setState(e.target.textContent);
    setIsFilter2Active(false);
  };

  return (
    <div className={s.CombinedDropdownFilter}>
      {/* 첫 번째 DropdownFilter */}
      <div
        className={`${s.DropdownFilter} ${
          isFilter1Active ? s.DropdownFilterActive : ""
        }`}
      >
        <div className={s.topContainer}>
          <span>{selectedValue1}</span>
          {isFilter1Active ? (
            <button className={s.button} onClick={handleFilter1Active}>
              <Image
                src="/icons/arrow-down.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          ) : (
            <button className={s.button} onClick={handleFilter1Active}>
              <Image src="/icons/arrow-up.svg" alt="" width={24} height={24} />
            </button>
          )}
        </div>

        {isFilter1Active && (
          <ul className={s.bottomContainer}>
            {data1.map((value, index) => {
              return (
                <li
                  key={`${index}-${value}`}
                  className={s.item}
                  onClick={(e) => handleSelectedValue1(e)}
                >
                  {value}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* 두 번째 DropdownFilter */}
      <div
        className={`${s.DropdownFilter} ${
          isFilter2Active ? s.DropdownFilterActive : ""
        }`}
      >
        <div className={s.topContainer}>
          <span>{selectedValue2}</span>
          {isFilter2Active ? (
            <button className={s.button} onClick={handleFilter2Active}>
              <Image
                src="/icons/arrow-down.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>
          ) : (
            <button className={s.button} onClick={handleFilter2Active}>
              <Image src="/icons/arrow-up.svg" alt="" width={24} height={24} />
            </button>
          )}
        </div>

        {isFilter2Active && (
          <ul className={s.bottomContainer}>
            {data2[selectedValue1]?.map((option, index) => (
              <li
                key={index}
                className={s.item}
                onClick={(e) => handleSelectedValue2(e)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
