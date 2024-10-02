"use client";

import { Title, Loading } from "@/components";
import { useCoupon } from "@/lib/hooks";
import { useState } from "react";
import s from "./PaymentPage.module.css";

export default function PaymentPage() {
  const [coupon, setCoupon] = useState("");

  const { loading, handleCoupon } = useCoupon();

  const handleInput = (e, setState) => {
    setState(e.target.value);
  };

  if (loading) {
    return <Loading text="결제 진행 중..." />;
  }

  return (
    <main className={s.PaymentPage}>
      <div className={s.container}>
        <Title label="결제하기" />
        {/* 상품명 섹션 */}
        <div className={s.sectionContainer}>
          <h3 className={s.sectionTitle}>상품명</h3>
          <p className={s.text}>앱티핏 적성검사 (대학생 버전)</p>
        </div>
        {/* 주문금액 섹션 */}
        <div className={s.sectionContainer}>
          <h3 className={s.sectionTitle}>주문금액</h3>
          <div className={s.priceContainer}>
            <span className={s.text}>상품금액</span>
            <span className={s.price}>19,900 원</span>
          </div>
          <div className={`${s.priceContainer} ${s.discountPrice}`}>
            <span className={s.text}>할인금액</span>
            <span className={s.price}>0 원</span>
          </div>
          <div className={`${s.priceContainer} ${s.totalPrice}`}>
            <span className={s.text}>총결제금액</span>
            <span className={s.price}>19,900 원</span>
          </div>
        </div>
        {/* 쿠폰등록 섹션 */}
        <div className={s.sectionContainer}>
          <h3 className={s.sectionTitle}>쿠폰 등록</h3>

          <div className={s.couponContainer}>
            <input
              className={s.couponInput}
              type="text"
              placeholder="쿠폰 번호"
              value={coupon}
              maxLength={16}
              onChange={(e) => handleInput(e, setCoupon)}
            />
            <button
              className={s.couponButton}
              onClick={() => handleCoupon(coupon)}
            >
              등록
            </button>
          </div>
          {/* <span className={s.error}>유효한 번호가 아닙니다!</span> */}
        </div>
        {/* 약관동의 섹션 */}
        <div className={s.sectionContainer}>
          <h3 className={s.sectionTitle}>약관 동의</h3>
          <div className={s.inputContainer}>
            <input className={s.checkbox} type="checkbox" />
            <span className={s.desc}>
              취소, 환불, 소득공제 정책 등 상품 구매 정책에 동의합니다 (필수)
            </span>
          </div>
        </div>
        {/* 결제버튼 섹션 */}
        <button className={s.button}>결제하기</button>
      </div>
    </main>
  );
}
