interface LabelProps {
  title: string;
  className?: string;
  htmlFor: string;
}

const Label = ({
  title,
  htmlFor,
  className = "text-sm font-medium text-[#262626]",
}: LabelProps) => {
  return (
    <label htmlFor={htmlFor} className={`block ${className}`}>
      {title}
    </label>
  );
};

export default Label;
