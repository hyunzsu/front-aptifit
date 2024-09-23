const submitResponses = async (data) => {
  const { page, user_id, responses } = data;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SUBMIT_RESPONSES_HANLA}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ page, user_id, responses }),
      }
    );

    if (!res.ok) {
      console.error("😢 submitResponses 성공했는데 문제가 생겼습니다!");
    }
    return await res.json();
  } catch (error) {
    console.error("😢 submitResponses 실패했습니다!");
  }
};

export default submitResponses;
