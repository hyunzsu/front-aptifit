"use client";

import Link from "next/link";
import { useLogout } from "@/lib/hooks";
import { useAuthStore } from "@/lib/stores";
import s from "./Navigation.module.css";

export default function Navigation() {
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();

  /* 로그아웃 함수 */
  const logout = () => {
    handleLogout();
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
          {!user ? (
            <li className={s.li}>
              <Link className={s.link} href="/login">
                로그인
              </Link>
            </li>
          ) : (
            <li className={s.li}>
              <button className={s.logoutButton} onClick={logout}>
                로그아웃
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
