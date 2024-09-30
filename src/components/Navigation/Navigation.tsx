"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useLogout, useResult } from "@/lib/hooks";
import { useAuthStore } from "@/lib/stores";
import s from "./Navigation.module.css";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthStore();
  const { handleInitializeResult } = useResult();
  const { handleLogout } = useLogout();
  const pathname = usePathname();

  /* 라우트별 네비게이션 컬러 테마 
    
    네비게이션의 배경이 투명색으로 특정 라우트의 배경에 맞춰 컬러 메타를 변경한다
  */
  const logoTheme =
    pathname === "/" || pathname === "/result" ? s.whiteLogo : s.blackLogo;

  const textTheme =
    pathname === "/" || pathname === "/result" ? s.whiteText : s.blackText;

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
          {/* 모바일용 메뉴 버튼 */}
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

          {/* 결과지 */}
          {user?.page === 10 && (
            <li className={`${s.li}`}>
              <button
                className={`${s.button} ${textTheme}`}
                onClick={handleInitializeResult}
              >
                결과지
              </button>
            </li>
          )}

          {!user ? (
            <li className={s.li}>
              <Link className={`${s.link} ${textTheme}`} href="/login">
                로그인
              </Link>
            </li>
          ) : (
            <li className={s.li}>
              <button
                className={`${s.button} ${textTheme}`}
                onClick={handleLogout}
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
