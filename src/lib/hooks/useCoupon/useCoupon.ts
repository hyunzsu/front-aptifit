"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/stores";

/* 
useCoupon

fetch 통신 이후 useAuthStore에 유저 데이터와 액세스 토큰을 각각 저장해
로그인 상태를 만들고 추가 회원정보 페이지 이동을 수행한다.
*/

const useCoupon = () => {
  const { user, updateUser, removeUser, access_token } = useAuthStore();
  const router = useRouter();

  const handleCoupon = async (coupon: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/coupon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            user_id: user.user_id,
            coupon: coupon,
          }),
        }
      );

      const fetchResult = await response.json();

      if (!response.ok) {
        if (fetchResult.status === 401) {
          removeUser();
          alert("로그인이 만료됐습니다");
          router.push("/login"); // 로그인 페이지로 이동
          return;
        }

        console.error("에러 발생:", fetchResult.error);
        alert(fetchResult.error);
        return;
      }

      updateUser({ IsPayment: true });
      alert("쿠폰이 등록됐습니다!");
      router.push("/");
    } catch (error) {
      console.error("데이터 전송 중 오류가 발생했습니다:", error);
    }
  };

  return { handleCoupon };
};

export default useCoupon;
