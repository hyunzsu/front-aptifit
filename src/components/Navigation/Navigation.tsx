"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Loading } from "@/components";
import { useLogout, useResult } from "@/lib/hooks";
import { useAuthStore } from "@/lib/stores";
import s from "./Navigation.module.css";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const { user } = useAuthStore();
  const { loading: resultLoading, handleInitializeResult } = useResult();
  const { loading: logoutLoading, handleLogout } = useLogout();
  const pathname = usePathname();

  /* 하이드레이션 미스매치 에러 해결 */
  useEffect(() => {
    setIsClient(true); // 클라이언트에서만 상태 처리
  }, []);

  /* 라우트별 네비게이션 컬러 테마 
    
    네비게이션의 배경이 투명색으로 특정 라우트의 배경에 맞춰 컬러 메타를 변경한다
  */
  const logoTheme =
    pathname === "/" || pathname === "/result" ? s.whiteLogo : s.blackLogo;

  const textTheme =
    pathname === "/" || pathname === "/result" ? s.whiteText : s.blackText;

  const toggleMenu = (state: boolean) => {
    setIsOpen(state);
  };

  if (logoutLoading) {
    return <Loading text="로그아웃 중..." />;
  }

  if (resultLoading) {
    return <Loading text="결과지 로딩 중..." />;
  }

  return (
    <nav className={`${s.Navigation}`}>
      <div className={s.innerContainer}>
        <h1 className={`${s.logo} ${logoTheme}`}>
          <Link href="/">APTIFIT</Link>
        </h1>
        <ul className={s.ul}>
          {/* 모바일용 메뉴 버튼 */}
          <button
            className={s.mobileMenuButton}
            onClick={() => toggleMenu(true)}
          >
            <Image
              src="/icons/menu.svg"
              alt="메뉴 열기 버튼"
              width={30}
              height={30}
            />
          </button>

          {/* 결과지 */}
          {isClient && user?.page === 10 && (
            <li className={`${s.li}`}>
              <button
                className={`${s.button} ${textTheme}`}
                onClick={handleInitializeResult}
              >
                결과지
              </button>
            </li>
          )}

          {isClient && !user ? (
            <li className={s.li}>
              <Link className={`${s.link} ${textTheme}`} href="/login">
                로그인
              </Link>
            </li>
          ) : (
            isClient && (
              <li className={s.li}>
                <button
                  className={`${s.button} ${textTheme}`}
                  onClick={handleLogout}
                >
                  로그아웃
                </button>
              </li>
            )
          )}
        </ul>
      </div>
      {/* 모바일 */}
      <div
        className={`${s.mobileNavigation} ${
          isOpen ? s.mobileNavigationOpen : ""
        }`}
      >
        <header className={s.mobileHeader}>
          <h1>
            <Link className={s.mobileNavLogo} href="/">
              APTIFIT
            </Link>
          </h1>
          <button
            className={s.mobileToggleButton}
            onClick={() => toggleMenu(false)}
          >
            <Image
              src="/icons/close.svg"
              alt="메뉴 닫기 버튼"
              width={30}
              height={30}
            />
          </button>
        </header>
        <ul className={s.mobileList}>
          {/* 결과지 */}
          {isClient && user?.page === 10 && (
            <li className={s.mobileListItem}>결과지</li>
          )}

          {isClient && !user ? (
            <li className={s.mobileListItem}>
              <Link className={s.mobileLink} href="/login">
                로그인
              </Link>
            </li>
          ) : (
            isClient && (
              <li className={s.mobileListItem}>
                <button
                  className={s.mobileButton}
                  onClick={() => {
                    toggleMenu(false);
                    handleLogout();
                  }}
                >
                  로그아웃
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}
