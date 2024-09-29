"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLogout } from "@/lib/hooks";
import { useAuthStore } from "@/lib/stores";
import s from "./Navigation.module.css";

export default function Navigation() {
  const { user } = useAuthStore();
  const { handleLogout } = useLogout();
  const pathname = usePathname();

  const logoTheme =
    pathname === "/" || pathname === "/result" ? s.whiteLogo : s.blackLogo;

  const textTheme =
    pathname === "/" || pathname === "/result" ? s.whiteText : s.blackText;

  /* 로그아웃 함수 */
  const logout = () => {
    handleLogout();
  };

  return (
    <nav className={`${s.Navigation}`}>
      <div className={s.innerContainer}>
        <h1 className={`${s.logo} ${logoTheme}`}>
          <Link href="/">APTIFIT</Link>
        </h1>
        <ul className={s.ul}>
          <li className={`${s.li}`}>
            <Link className={`${s.link} ${textTheme}`} href="/result">
              결과지
            </Link>
          </li>
          {!user ? (
            <li className={s.li}>
              <Link className={`${s.link} ${textTheme}`} href="/login">
                로그인
              </Link>
            </li>
          ) : (
            <li className={s.li}>
              <button
                className={`${s.logoutButton} ${textTheme}`}
                onClick={logout}
              >
                로그아웃
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
