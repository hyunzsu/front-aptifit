"use client";

import { useState } from "react";
import Image from "next/image";
import s from "./DropdownFilter.module.css";

type TDropdownFilter = {
  defaultValue: string;
  data: string[];
  setState: any;
};

export default function DropdownFilter({
  defaultValue,
  data,
  setState,
}: TDropdownFilter) {
  const [selectedValue, setIsSelectedValue] = useState(defaultValue);
  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleFilterActive = () => {
    setIsFilterActive(!isFilterActive);
  };

  const handleSelectedValue = (e) => {
    setIsSelectedValue(e.target.textContent);
    setState(e.target.textContent);
    setIsFilterActive(false);
  };

  return (
    <div
      className={`${s.DropdownFilter} ${
        isFilterActive ? s.DropdownFilterActive : ""
      }`}
    >
      <div className={s.topContainer}>
        <span>{selectedValue}</span>
        {isFilterActive ? (
          <button className={s.button} onClick={handleFilterActive}>
            <Image src="/icons/arrow-down.svg" alt="" width={24} height={24} />
          </button>
        ) : (
          <button className={s.button} onClick={handleFilterActive}>
            <Image src="/icons/arrow-up.svg" alt="" width={24} height={24} />
          </button>
        )}
      </div>

      {isFilterActive && (
        <ul className={s.bottomContainer}>
          {data.map((value, index) => {
            return (
              <li
                key={`${index}-${value}`}
                className={s.item}
                onClick={(e) => handleSelectedValue(e)}
              >
                {value}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
