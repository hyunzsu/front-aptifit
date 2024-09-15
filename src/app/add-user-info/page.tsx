import { Title } from "@/components";
import s from "./AddUserInfoPage.module.css";

export default function AddUserInfoPage() {
  return (
    <main className={s.AddUserInfoPage}>
      <div className={s.container}>
        <Title label="회원정보 등록" />
        {/* 학교 입력 */}
        <div className={s.inputContainer}>
          <label className={s.label} htmlFor="">
            학교
          </label>
          <input className={s.input} type="text" placeholder="앱티대학교" />
        </div>
        {/* 희망직업 입력 */}
        <div className={s.inputContainer}>
          <label className={s.label} htmlFor="">
            희망직업
          </label>
          <input className={s.input} type="text" placeholder="희망직업" />
        </div>
      </div>
    </main>
  );
}
