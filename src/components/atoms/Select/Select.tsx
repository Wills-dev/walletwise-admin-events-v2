import { optionsType } from "@/lib/types";
import clsx from "clsx";
import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  options: optionsType[];
  placeholder?: string;
  placeholderDisabled?: boolean;
  variant?: "primary" | "secondary";
}

const Select = ({
  options,
  placeholder,
  placeholderDisabled = true,
  className = "",
  variant = "primary",
  ...props
}: SelectProps) => {
  const variants = {
    primary: {
      div: "relative flex items-center backdrop-blur-2xl bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 dark:text-gray-500 transition-all focus-within:border-[#5c24cc] dark:focus-within:border-purple-700 duration-300 sm:h-11 h-10 p-1",
      select:
        "w-full bg-inherit h-full placeholder-gray-400 dark:placeholder-gray-600 outline-none",
    },
    secondary: {
      div: "relative w-fit flex items-center rounded-lg border border-[#F5F5F5] transition-all focus-within:border-black/20 duration-300 h-10 px-3 bg-[#00000005]",
      select:
        "w-full bg-[#00000005] h-full placeholder:text-[#A1A1A1] text-sm font-medium text-[#A1A1A1] outline-none",
    },
  };

  const styles = variants[variant];

  return (
    <div className={clsx(styles.div)}>
      <select
        style={{ fontSize: "14px" }}
        className={clsx(styles?.select, className)}
        {...props}
      >
        <option value="" disabled={placeholderDisabled}>
          {placeholder || "Select an option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-sm">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
