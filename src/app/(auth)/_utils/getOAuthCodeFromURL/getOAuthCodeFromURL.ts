const getOAuthCodeFromURL = () => {
  // URL에서 인증 코드 추출
  const oAuthCode = new URL(window.location.href).searchParams.get("code");

  return oAuthCode;
};

export default getOAuthCodeFromURL;
