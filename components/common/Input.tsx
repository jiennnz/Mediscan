import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

type InputProps<T extends FieldValues> = {
  type: HTMLInputTypeAttribute;
  id: string;
  placeholder?: string;
  register: UseFormRegister<T>;
  errors: Partial<Record<keyof T, { message?: string }>>;
  className?: string;
};

const Input = <T extends FieldValues>({
  type,
  id,
  placeholder,
  register,
  errors,
  className,
}: InputProps<T>) => {
  return (
    <div className="relative">
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        {...register(id as Path<T>)}
        className={clsx(
          "peer rounded-[5px] border border-black25 placeholder-transparent focus:border-main",
          className,
          { "border-error": errors[id] },
        )}
      />
      <label className="label">{placeholder}</label>
      {errors[id] && (
        <p className="text-smaller text-error">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default Input;
