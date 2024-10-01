import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getDataFromSessionStorage } from "@/lib/utils";

const useTestQuestion = () => {
  const [responses, setResponses] = useState([]);
  const [questions, setQuestions] = useState([]);

  const { id } = useParams();

  // 세션스토리지에 저장된 aptifit[id]를 바탕으로 responses, questions 상태변수를 업데이트
  useEffect(() => {
    const savedData = getDataFromSessionStorage(`aptifit${id}`);

    if (savedData) {
      const { questions, responses } = savedData;

      setResponses(responses);
      setQuestions(questions);
    }
  }, []);

  return { responses, setResponses, questions, setQuestions };
};

export default useTestQuestion;
