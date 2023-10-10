import {
  UseFormRegister,
  Path,
  FieldValues,
  DeepMap,
  FieldError,
  RegisterOptions,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

type InputProps<TFormValues extends FieldValues> = {
  inputType: string;
  label?: string;
  register: UseFormRegister<TFormValues>;
  required: boolean;
  name: Path<TFormValues>;
  errors: Partial<DeepMap<TFormValues, FieldError>>;
  rules: RegisterOptions;
};

const Input = <TFormValues extends FieldValues>({
  inputType,
  label,
  register,
  name,
  required,
  errors,
  rules,
}: InputProps<TFormValues>) => {
  const errorMessages = errors[name];
  const hasError = !!(errors && errorMessages);

  return (
    <>
      {label && (
        <label className="text-[16px]  text-customBlack font-[700] block">
          {required && <span className="text-[#ff0000]">*</span>} {label}{" "}
          {!required && <span className="font-[400] ml-1">(Optional)</span>}
        </label>
      )}
      <div className="relative">
        <input
          {...(register && register(name, rules))}
          type={inputType}
          className={`w-full h-[48px] rounded-md py-1 pr-3 pl-3 text-customBlack text-[16px] bg-[#F0F0F0] outline-none border-transparent `}
        />

        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => {
            return (
              <p className="text-[#ff0000] text-[14px] my-1.5 font-[600]">
                {message}
              </p>
            );
          }}
        />
      </div>
    </>
  );
};

export default Input;
