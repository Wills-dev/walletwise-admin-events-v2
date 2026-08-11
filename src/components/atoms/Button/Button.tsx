"use client";

import { Loader } from "lucide-react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  height?: string;
  width?: string;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  href?: string;
  bgColor?: string;
  bgHoverColor?: string;
}

const Button = ({
  children,
  onClick,
  href,
  type = "button",
  width = "w-full",
  height = "h-12",
  disabled = false,
  loading = false,
  loadingLabel = "Loading",
  bgColor = "bg-[#5A27CC] dark:bg-purple-800 text-white",
  bgHoverColor = "hover:bg-purple-700 dark:hover:bg-purple-700",
  className = `relative flex items-center justify-center whitespace-nowrap font-semibold px-6 rounded-lg`,
}: ButtonProps) => {
  const buttonElement = (
    <button
      type={type}
      onClick={onClick}
      className={`transform transition-all duration-300 ${className} ${width} ${height} ${bgColor} ${
        loading || disabled
          ? "opacity-40 cursor-not-allowed"
          : `cursor-pointer ${bgHoverColor} hover:scale-[1.02]`
      }`}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <Loader className="h-8 w-8 animate-spin" aria-hidden="true" />
          <span className="sr-only">{loadingLabel}</span>
        </>
      ) : (
        children
      )}
    </button>
  );

  return href ? (
    <Link href={href} className={`${width}`}>
      {buttonElement}
    </Link>
  ) : (
    buttonElement
  );
};

export default Button;
