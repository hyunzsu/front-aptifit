import Image from "next/image";
import s from "./MajorCard.module.css";

export default function MajorCard(props: { index: number; majorName: string }) {
  const rank = props.index + 1;

  return (
    <div className={s.card}>
      <div className={s.imageWrapper}>
        <Image
          src={`/major_icons/${props.majorName}.svg`}
          alt={`${props.majorName} 학과 아이콘`}
          fill
          sizes="(max-width: 425px) 80px, 100px"
          className={s.majorIcon}
        />
      </div>
      <p className={s.majorRank}>{rank}위</p>
      <p className={s.majorName}>{props.majorName}</p>
    </div>
  );
}
