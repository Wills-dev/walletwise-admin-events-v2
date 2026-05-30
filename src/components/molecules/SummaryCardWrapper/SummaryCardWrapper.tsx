import clsx from "clsx";

const SummaryCardWrapper = ({
  variant = "maxThree",
  children,
}: {
  variant?: "maxFour" | "maxThree";
  children: React.ReactNode;
}) => {
  const variants = {
    maxFour: "xl:grid-cols-4 lg:grid-cols-3 sm: grid-cols-2 grid-cols-1 gap-4",
    maxThree: "lg:grid-cols-3 sm: grid-cols-2 grid-cols-1 gap-4",
  };

  const styles = variants[variant];

  return <div className={clsx(styles, "grid w-full")}>{children}</div>;
};

export default SummaryCardWrapper;
