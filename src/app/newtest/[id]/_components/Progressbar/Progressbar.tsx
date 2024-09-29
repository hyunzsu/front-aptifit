import s from "./Progressbar.module.css";

export default function Progressbar() {
  return (
    <div className={s.Progressbar}>
      <div className={s.percentagebar}></div>
    </div>
  );
}
