import { getAccessTokenFromURL } from "../index";

const saveAccessTokenToLocalStorage = () => {
  // accessToken URL로부터 추출
  const accessToken = getAccessTokenFromURL();

  // accessToken 로컬 스토리지에 저장
  localStorage.setItem("accessToken", JSON.stringify(accessToken));
};

export default saveAccessTokenToLocalStorage;
