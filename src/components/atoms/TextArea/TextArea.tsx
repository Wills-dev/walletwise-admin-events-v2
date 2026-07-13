import { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const Textarea = ({ className = "", ...props }: TextareaProps) => {
  return (
    <textarea
      style={{ fontSize: "14px" }}
      className={`backdrop-blur-2xl bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 dark:text-gray-500 transition-all w-full focus:border-[#5c24cc] dark:focus:border-purple-700 duration-300 p-2 outline-none ${className}`}
      {...props}
    ></textarea>
  );
};

export default Textarea;
