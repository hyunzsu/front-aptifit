/**
 * Card 컴포넌트
 *
 * // 기본 사용
 * <Card title="제목" description="설명" />
 *
 * // 크기 조절 및 클래스 추가
 * <Card
 *   title="크기 조절 카드"
 *   description="설명"
 *   width="300px"
 *   height="200px"
 *   className="custom-card"
 * />
 *
 * // 컴포넌트를 포함한 설명 사용
 * <Card
 *   title="컴포넌트 포함 카드"
 *   description={<Button onClick={handleClick}>자세히 보기</Button>}
 * />
 */
import s from "./Card.module.css";

type CardProps = {
  /** 카드의 제목 */
  title: string;
  /** 카드의 설명. 문자열 또는 React 컴포넌트를 받을 수 있습니다. */
  description: React.ReactNode;
  /** 카드의 너비. 문자열(예: '100px', '50%') 또는 숫자(픽셀 단위)로 지정할 수 있습니다. */
  width?: string | number;
  /** 카드의 높이. 문자열(예: '100px', '50%') 또는 숫자(픽셀 단위)로 지정할 수 있습니다. */
  height?: string | number;
  /** 카드 전체에 적용할 추가 CSS 클래스 */
  className?: string;
  /** 제목에 적용할 추가 CSS 클래스 */
  titleClassName?: string;
  /** 설명에 적용할 추가 CSS 클래스 */
  descriptionClassName?: string;
  /** 카드 클릭 이벤트 핸들러 */
  onClick?: () => void;
  /** 카드가 선택되었는지 여부 */
  isSelected?: boolean;
  isArray?: boolean;
};

export default function Card({
  title,
  description,
  width,
  height,
  className,
  titleClassName,
  descriptionClassName,
  onClick,
  isSelected,
  isArray,
}: CardProps) {
  const cardStyle: React.CSSProperties = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`${s.card} ${className || ""} ${
        isSelected ? s.selectedCard : ""
      }`}
      style={cardStyle}
      onClick={onClick}
    >
      <h2 className={`${s.title} ${titleClassName || ""}`}>{title}</h2>
      <div className={`${s.description} ${descriptionClassName || ""}`}>
        {isArray
          ? description.map((item, index) => {
              return (
                <p key={index} className={s.descriptionArray}>
                  {item}
                </p>
              );
            })
          : description}
      </div>
    </div>
  );
}
