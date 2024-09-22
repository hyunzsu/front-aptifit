import { Title } from "@/components";
import s from "./LoginPage.module.css";
import LoginForm from "./_components/LoginForm/LoginForm";

export default function LoginPage() {
  return (
    <main className={s.loginPage}>
      <div className={s.container}>
        <Title label="로그인" />
        <LoginForm />
      </div>
    </main>
  );
}
