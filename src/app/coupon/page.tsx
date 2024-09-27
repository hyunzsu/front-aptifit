"use client";

import { Title } from "@/components";
import s from "./CouponPage.module.css";
import { postDataWithAuth } from "@/lib/services";
import { useState } from "react";

export default function CouponPage() {
  const [coupon, setCoupon] = useState("");

  const useCoupon = async () => {
    if (coupon.length < 16) {
      alert("쿠폰 번호 16자리를 입력해주세요");
      return;
    }

    try {
      await postDataWithAuth("coupon", { coupon });
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  const handleInput = (e, setState) => {
    setState(e.target.value);
  };

  return (
    <main className={s.PaymentPage}>
      <div className={s.container}>
        <Title label="쿠폰등록" />
        {/* 쿠폰등록 섹션 */}
        <div className={s.sectionContainer}>
          <div className={s.couponContainer}>
            <input
              maxLength={16}
              className={s.couponInput}
              type="text"
              placeholder="쿠폰 번호"
              value={coupon}
              onChange={(e) => handleInput(e, setCoupon)}
            />
          </div>
          {/* <span className={s.error}>유효한 번호가 아닙니다!</span> */}
        </div>
        {/* 결제버튼 섹션 */}
        <button className={s.button} onClick={useCoupon}>
          등록하기
        </button>
      </div>
    </main>
  );
}
