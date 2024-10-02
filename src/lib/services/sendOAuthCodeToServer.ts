const sendOAuthCodeToServer = async (provider: string, oAuthCode: string) => {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/${provider}/callback`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        code: oAuthCode,
      }).toString(),
    }
  );
};

export default sendOAuthCodeToServer;
