import s from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={s.Navigation}>
      <div className={s.innerContainer}>
        <h1 className={s.logo}>APTIFIT</h1>
        <ul className={s.ul}>
          <li className={s.li}>결과지</li>
          <li className={s.li}>로그인</li>
        </ul>
      </div>
    </nav>
  );
}
