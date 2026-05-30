import CrownIcon from "@/components/atoms/icons/CrownIcon";
import EventDropdown from "@/components/molecules/EventDropdown/EventDropdown";
import { X } from "lucide-react";

const Sidebar = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const currentUser = {
    companyName: "Ejanla-1",
  };

  return (
    <div
      className={`h-screen fixed max-w-64 w-full transition-transform duration-500 ease-out bg-[#F9FAFB] border-r border-[#F0F0F0] p-2 ${!isOpen ? "max-lg:-translate-x-64" : "max-lg:translate-0"}`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between py-2.5">
          <div className="flex items-center gap-2.5 font-geist">
            <div className="w-10 h-10 rounded-[11.11px] flex justify-center items-center bg-black text-[18px] text-white">
              <CrownIcon />
            </div>
            <div className="space-y-0.5">
              <h6 className="text-sm font-semibold leading-5.25">
                {currentUser?.companyName}
              </h6>
              <p className="text-xs font-medium text-[#737373]">Admin</p>
            </div>
          </div>
          {isOpen && (
            <button
              type="button"
              onClick={toggleMenu}
              className="lg:hidden block cursor-pointer "
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="space-y-4">
          <EventDropdown />
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
