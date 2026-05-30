import { getCurrencySign } from "@/lib/helpers/currencySign";

const SummaryCard = ({
  title,
  value,
  icon: Icon,
  currency,
  children,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  currency?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="w-full border border-[#F5F5F5] rounded-[16px] px-6 py-5.5">
      <div className="space-y-2.5">
        <div className="flex justify-between gap-4">
          <h6 className="text-sm text-[#737373] font-medium">{title}</h6>
          <div className="w-9 h-9 border border-[#F5F5F5] rounded-[10px] flex justify-center items-center">
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <p className="sm:text-[30px] text-lg font-medium text-[#262626]">
          {currency && getCurrencySign(currency)}
          {value}
        </p>
        {children}
      </div>
    </div>
  );
};

export default SummaryCard;
