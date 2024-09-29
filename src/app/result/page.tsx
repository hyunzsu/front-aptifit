import { Section01, Section02, Section03, Section04 } from "./sections";
import s from "./ResultPage.module.css";

export default function ResultPage() {
  return (
    <main className={s.ResultPage}>
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
    </main>
  );
}
