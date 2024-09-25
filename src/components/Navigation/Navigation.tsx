"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getFromSessionStorage } from "@/lib/utils";
import s from "./Navigation.module.css";
import { useAuthStore } from "@/lib/stores";

export default function Navigation() {
  const router = useRouter();
  const { isLoggedIn, logout, checkLoginStatus } = useAuthStore();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  /* 로그아웃 함수 */
  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      sessionStorage.removeItem("user"); // 로컬스토리지에 저장된 유저 데이터 제거
      logout();
      router.push("/");
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
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
            <Link className={s.link} href="/result">
              결과지
            </Link>
          </li>
          {isLoggedIn ? (
            <li className={`${s.li}`}>
              <button className={s.logoutButton} onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          ) : (
            <li className={`${s.li}`}>
              <Link className={s.link} href="/login">
                로그인
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
