import { CardDescription } from "@/components/ui/card";

const ChartDesc = ({ children }: { children: React.ReactNode }) => {
  return (
    <CardDescription className="text-[#262626] font-medium sm:text-[32px] text-lg">
      {children}
    </CardDescription>
  );
};

export default ChartDesc;
