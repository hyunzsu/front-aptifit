import s from './Title.module.css';

type TitleProps = {
  label: string;
  className?: string;
};

export default function Title({ label, className }: TitleProps) {
  return <h2 className={`${s.title} ${className || ''}`}>{label}</h2>;
}
