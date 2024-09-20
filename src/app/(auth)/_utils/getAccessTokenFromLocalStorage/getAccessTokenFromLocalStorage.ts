const getAccessTokenFromLocalStorage = () => {
  // 로컬스토리지에서 accessToken 가져오기
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return JSON.parse(accessToken);
  }
};

export default getAccessTokenFromLocalStorage;
