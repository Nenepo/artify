import { Eye, EyeOff } from "lucide-react";

type FormInputProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isPassword?: boolean;
  showPassword?: boolean;
  togglePassword?: () => void;
};

 const FormInput = ({
  name,
  type,
  placeholder,
  value,
  onChange,
  isPassword = false,
  showPassword = false,
  togglePassword,
}: FormInputProps) => {
  return (
    <div className="w-full flex flex-col gap-2 relative">
      <label htmlFor={name} className="capitalize text-white text-xs">
        {name}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
       className={`${
  value.trim().length !== 0 ? "bg-transparent focus:bg-transparent border-white/30" : "bg-white/10"
} px-4 py-2.5 h-12 w-full rounded-lg text-white placeholder:text-white/50 text-base outline-none border border-transparent focus:border-white/30 transition-all duration-300`}

      />
      {isPassword && togglePassword && (
        <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 bottom-6  cursor-pointer transition-opacity duration-300 hover:opacity-80"
        >
          {showPassword ? (
            <EyeOff size={16} color="white" />
          ) : (
            <Eye size={16} color="white" />
          )}
        </button>
      )}
    </div>
  );
};

export default FormInput;