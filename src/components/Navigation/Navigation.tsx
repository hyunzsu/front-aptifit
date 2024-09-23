import Link from "next/link";
import s from "./Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={s.Navigation}>
      <div className={s.innerContainer}>
        <h1 className={s.logo}>
          <Link href="/">APTIFIT</Link>
        </h1>
        <ul className={s.ul}>
          <li className={s.li}>
            <Link className={s.link} href="/result">
              결과지
            </Link>
          </li>
          <li className={s.li}>
            <Link className={s.link} href="/login">
              로그인
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
