import { LayoutContainer } from "@/components";
import {
  Title,
  Percentage,
  Progressbar,
  TestItem,
  TestOption,
} from "./_components";
import s from "./NewTestPage.module.css";

function NewTestPage() {
  return (
    <main className={s.NewTestPage}>
      <LayoutContainer>
        {/* 01. 제목 */}
        <header className={s.TestHeaderSection}>
          <div className={s.TitleContainer}>
            <Title />
            <Percentage />
          </div>
          <Progressbar />
        </header>
        {/* 02. 문제 */}
        <div className={s.TestSection}>
          <TestItem />
          <TestOption />
        </div>
      </LayoutContainer>
    </main>
  );
}

export default NewTestPage;
