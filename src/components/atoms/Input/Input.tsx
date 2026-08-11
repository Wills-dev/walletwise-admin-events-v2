"use client";

import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  id?: string;
  icon?: React.ReactNode;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showPassword?: "text" | "password";
  onTogglePassword?: () => void;
  passwordVisibilityLabel?: string;
  disable?: boolean;
  min?: string;
  step?: string;
  minLength?: number;
  autoComplete?: string;
  required?: boolean;
}

const Input = ({
  id,
  showPassword,
  placeholder = "",
  onChange,
  value,
  onTogglePassword,
  passwordVisibilityLabel = "password",
  type,
  icon,
  name,
  disable = false,
  min,
  step,
  minLength,
  autoComplete,
  required,
}: InputProps) => {
  const paddingX =
    icon !== undefined && showPassword !== undefined
      ? "px-9"
      : icon !== undefined && showPassword === undefined
        ? "pl-9 pr-1"
        : icon === undefined && showPassword !== undefined
          ? "pl-1 pr-9"
          : "px-1";

  return (
    <div className="relative flex items-center backdrop-blur-2xl bg-white dark:bg-gray-800 rounded-[10px] border border-gray-200 dark:border-gray-700 dark:text-gray-400 transition-all focus-within:border-[#5c24cc] dark:focus-within:border-purple-700 duration-300 sm:h-11 h-10 p-1">
      {icon && icon}
      <input
        id={id}
        style={{ fontSize: "14px" }}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        min={min}
        step={step}
        minLength={minLength}
        autoComplete={autoComplete}
        required={required}
        disabled={disable}
        className={`w-full bg-inherit h-full placeholder-gray-400 dark:placeholder-gray-600 outline-none ${paddingX}`}
        placeholder={placeholder}
      />
      {showPassword !== undefined && (
        <button
          type="button"
          onClick={onTogglePassword}
          aria-label={
            showPassword === "text"
              ? `Hide ${passwordVisibilityLabel}`
              : `Show ${passwordVisibilityLabel}`
          }
          aria-pressed={showPassword === "text"}
          className="absolute right-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors caret-[#5c24cc]"
        >
          {showPassword === "text" ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
