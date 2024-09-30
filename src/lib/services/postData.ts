/* eslint-disable @typescript-eslint/no-explicit-any */

const postData = async (endpoint: string, data: any) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export default postData;
