/* eslint-disable @typescript-eslint/no-explicit-any */

const postDataWithAuth = async (
  endpoint: string,
  access_token: string,
  data: any
) => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};

export default postDataWithAuth;
