import { FieldError, UseFormRegister } from "react-hook-form";
import s from "./FormInput.module.css";

type FormInputProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
};

export default function FormInput({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder = "",
}: FormInputProps) {
  return (
    <div className={s.formWrapper}>
      <label htmlFor={name} className={s.label}>
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={s.input}
      />
      {error && <p className={s.error}>{error.message}</p>}
    </div>
  );
}
