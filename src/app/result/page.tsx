import { ProtectedRoute } from "@/components";
import s from "./ResultPage.module.css";

export default function ResultPage() {
  return (
    <ProtectedRoute>
      <main className={s.ResultPage}>결과 페이지</main>
    </ProtectedRoute>
  );
}
