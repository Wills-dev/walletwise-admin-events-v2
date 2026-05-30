import { CardTitle } from "@/components/ui/card";

const ChartTitle = ({ title }: { title: string }) => {
  return (
    <CardTitle className="font-medium text-sm text-[#737373]">
      {title}
    </CardTitle>
  );
};

export default ChartTitle;
