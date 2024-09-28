"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login"); // 로그인 페이지로 리디렉션
    }
  }, []);

  if (!user) {
    return null; // 리디렉션 중에는 아무것도 렌더링하지 않음
  }

  return <>{children}</>; // 로그인 상태이면 자식 컴포넌트를 렌더링
};

export default ProtectedRoute;
