import { FieldError, UseFormRegister } from "react-hook-form";
import s from "./FormInput.module.css";

type FormInputProps = {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  isCheckbox?: boolean;
};

export default function FormInput({
  label,
  name,
  register,
  error,
  type = "text",
  placeholder = "",
  isCheckbox = false,
}: FormInputProps) {
  return (
    <div>
      {isCheckbox ? (
        <div className={s.checkboxWrapper}>
          <input
            id={name}
            type="checkbox"
            {...register(name)}
            className={s.checkbox}
          />
          <label htmlFor={name} className={s.checkboxLabel}>
            {label}
          </label>
        </div>
      ) : (
        <div className={s.inputWrapper}>
          <label htmlFor={name} className={s.inputLabel}>
            {label}
          </label>
          <input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className={s.input}
          />
        </div>
      )}
      {error && <p className={s.error}>{error.message}</p>}
    </div>
  );
}
