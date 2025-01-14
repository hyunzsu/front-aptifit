// useTestLogic.ts

/**
 * 테스트 페이지의 로직을 관리하는 커스텀 훅
 *
 * 이 훅은 테스트 페이지의 상태 관리와 비즈니스 로직을 담당합니다.
 * 질문 로드, 응답 관리, 페이지 이동 등의 기능을 제공합니다.
 *
 * 작업자 : 김도현
 */

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  loadTestData,
  saveTestData,
  formValidation,
} from "@/lib/utils/testUtils";
import { useAuthStore } from "@/lib/stores";

export default function useTestLogic() {
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const { access_token } = useAuthStore();

  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const savedData = loadTestData(params.id as string);
    if (savedData) {
      setQuestions(savedData.questions);
      setResponses(savedData.responses);
    }
    setLoading(false);
  }, [params.id]);

  const goToNextPage = async () => {
    const nextPage = Number(params.id) + 1;

    if (!formValidation(params.id as string)) {
      alert("아직 풀지 않은 문제가 있습니다!");
      return;
    }

    if (nextPage >= 10) {
      // sessionStorage.removeItem("aptifit9");

      const savedData = loadTestData(params.id as string);

      if (savedData) {
        const { page, user_id, responses } = savedData;

        try {
          const fetchResult = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/submit_responses_university`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
              },
              credentials: "include",
              body: JSON.stringify({ page, user_id, responses }),
            }
          );
          const result = await fetchResult.json();

          if (!fetchResult.ok) {
            console.error("😢 submitResponses 성공했는데 문제가 생겼습니다!");
          }
          saveTestData(nextPage.toString(), {
            page: result.page,
            user_id: result.user_id,
            name: result.name,
            major1: result.major1,
            major2: result.major2,
            major3: result.major3,
            major4: result.major4,
            major5: result.major5,
          });
          router.push(`/result`);
        } catch (error) {
          console.error("😢 submitResponses 실패했습니다!");
        }
      }

      setLoading(false);
      return;
    }

    setLoading(true);

    const savedData = loadTestData(params.id as string);

    if (savedData) {
      // const submitData = await submitResponses(savedData);

      const { page, user_id, responses } = savedData;

      try {
        const fetchResult = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/submit_responses_university`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
            credentials: "include",
            body: JSON.stringify({ page, user_id, responses }),
          }
        );
        const result = await fetchResult.json();

        if (!fetchResult.ok) {
          console.error("😢 submitResponses 성공했는데 문제가 생겼습니다!");
        }

        saveTestData(nextPage.toString(), {
          questions: result.questions,
          responses: result.responses,
          page: result.page,
          user_id: result.user_id,
        });
        router.push(`/test/${nextPage}`);
      } catch (error) {
        console.error("😢 submitResponses 실패했습니다!");
      }
    }

    setLoading(false);
  };

  return {
    questions,
    responses,
    loading,
    setResponses,
    goToNextPage,
  };
}
