"use client";

import { getFromSessionStorage } from "../";

const checkUserAuth = () => {
  const accessToken = getFromSessionStorage("access_token");

  if (!accessToken) {
    alert("로그인이 필요한 라우트입니다!");
    window.location.href = "/login";
  } else {
    return;
  }
};

export default checkUserAuth;
