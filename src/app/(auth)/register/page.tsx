import { Title } from "@/components";
import s from "./register.module.css";
import SignUpForm from "./_components/SignUpForm/SignUpForm";

export default function RegisterPage() {
  return (
    <main className={s.registerPage}>
      <div className={s.container}>
        <Title label="회원가입" />
        <SignUpForm />
      </div>
    </main>
  );
}
