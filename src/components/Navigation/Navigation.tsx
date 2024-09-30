"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLogout } from "@/lib/hooks";
import { useAuthStore } from "@/lib/stores";
import s from "./Navigation.module.css";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`${s.Navigation}`}>
      <div className={s.innerContainer}>
        <h1 className={`${s.logo} ${logoTheme}`}>
          <Link href="/">APTIFIT</Link>
        </h1>
        <ul className={s.ul}>
          {!isOpen ? (
            <button className={s.mobileMenuButton} onClick={toggleMenu}>
              <Image
                src="/icons/menu.svg"
                alt="메뉴 열기 버튼"
                width={30}
                height={30}
              />
            </button>
          ) : (
            <button className={s.mobileMenuButton} onClick={toggleMenu}>
              <Image
                src="/icons/close.svg"
                alt="메뉴 닫기 버튼"
                width={30}
                height={30}
              />
            </button>
          )}

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
      {/* 모바일 */}
      <ul
        className={`${s.mobileNavigation} ${
          isOpen ? s.mobileNavigationOpen : ""
        }`}
      >
        <li className={`${s.mobileLi}`}>
          <Link className={`${s.mobileLink} ${textTheme}`} href="/result">
            결과지
          </Link>
        </li>
        <li className={`${s.mobileLi}`}>
          <Link className={`${s.mobileLink} ${textTheme}`} href="/login">
            로그인
          </Link>
        </li>
      </ul>
    </nav>
  );
}
