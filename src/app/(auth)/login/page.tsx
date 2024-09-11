import {
  NaverLoginButton,
  KakaoLoginButton,
  GoogleLoginButton,
} from "./_components";
import s from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <main className={s.LoginPage}>
      로그인 페이지
      <div>
        <NaverLoginButton />
        <KakaoLoginButton />
        <GoogleLoginButton />
      </div>
    </main>
  );
}
