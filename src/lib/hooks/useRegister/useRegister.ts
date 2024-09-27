"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

const useRegister = () => {
  const router = useRouter();
  const { login } = useAuthStore();

  const handleRegister = async ({ name, phone, password, email }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            phone,
            email,
            password,
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
      alert("추가 정보 페이지로 이동합니다!");
      router.push("/add-user-info");
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { handleRegister };
};

export default useRegister;
