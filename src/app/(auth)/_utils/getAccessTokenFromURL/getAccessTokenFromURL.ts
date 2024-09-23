const getAccessTokenFromURL = () => {
  // URL에서 AccessToken 추출
  const accessToken = new URL(window.location.href).searchParams.get(
    "access_token"
  );

  return accessToken;
};

export default getAccessTokenFromURL;
