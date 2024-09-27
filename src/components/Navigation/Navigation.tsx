"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";
import s from "./Navigation.module.css";

export default function Navigation() {
  const { isLoggedIn, logout } = useAuthStore();
  const router = useRouter();

  /* 로그아웃 함수 */
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        logout();
        alert("로그아웃이 됐습니다!");
        router.push("/");
      } else {
        console.error("에러 발생:", result.error);
        alert(result.error);
      }
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <nav className={`${s.Navigation}`}>
      <div className={s.innerContainer}>
        <h1 className={s.logo}>
          <Link href="/">APTIFIT</Link>
        </h1>
        <ul className={s.ul}>
          <li className={`${s.li}`}>
            <Link className={s.link} href="/coupon">
              쿠폰 등록
            </Link>
          </li>
          <li className={`${s.li}`}>
            <Link className={s.link} href="/result">
              결과지
            </Link>
          </li>
          {!isLoggedIn ? (
            <li className={s.li}>
              <Link className={s.link} href="/login">
                로그인
              </Link>
            </li>
          ) : (
            <li className={s.li}>
              <button className={s.link} onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
