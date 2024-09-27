"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

const useLogin = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleLogin = async ({ email, password }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const fetchResult = await response.json();

      if (!response.ok) {
        console.error("에러 발생:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }

      login(fetchResult);

      if (!fetchResult.IsAdditionalUserInfo) {
        console.log(fetchResult.IsAdditionalUserInfo);
        alert("아직 입력하지 않은 정보가 있습니다!");
        router.push("/add-user-info");
      } else {
        alert("로그인이 됐습니다!");
        router.push("/");
      }
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { handleLogin };
};

export default useLogin;
