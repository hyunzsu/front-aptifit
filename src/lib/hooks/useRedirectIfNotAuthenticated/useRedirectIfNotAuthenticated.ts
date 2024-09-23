import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccessToken } from "@/lib/hooks";

const useRedirectIfNotAuthenticated = () => {
  const isAuthenticated = useAccessToken();
  const router = useRouter();

  // 로그인되지 않은 사용자는 /login으로 리디렉트
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return isAuthenticated;
};

export default useRedirectIfNotAuthenticated;
