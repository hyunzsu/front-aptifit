import { ReactNode } from "react";
import s from "./LayoutContainer.module.css";

type TContainer = {
  children?: ReactNode;
};

export default function LayoutContainer({ children }: TContainer) {
  return <div className={`${s.LayoutContainer}`}>{children}</div>;
}
