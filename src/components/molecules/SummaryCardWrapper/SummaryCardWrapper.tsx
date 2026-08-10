import clsx from "clsx";

const SummaryCardWrapper = ({
  variant = "maxThree",
  children,
}: {
  variant?: "maxFour" | "maxThree";
  children: React.ReactNode;
}) => {
  const variants = {
    maxFour: "grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    maxThree: "grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
  };

  const styles = variants[variant];

  return <div className={clsx(styles, "grid w-full")}>{children}</div>;
};

export default SummaryCardWrapper;
