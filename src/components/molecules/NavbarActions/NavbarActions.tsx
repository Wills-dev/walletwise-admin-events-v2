import { routes } from "@/lib/helpers/routes";
import { Bell, Plus } from "lucide-react";
import Link from "next/link";

const NavbarActions = () => {
  return (
    <div className="flex items-center gap-2">
      <Link
        href={routes?.newEvent}
        className="bg-[#5A27CC] rounded-[8px] px-3 py-2.5 flex items-center justify-center text-white gap-2"
      >
        <Plus className="w-4 h-4" />
        <span className="font-medium text-xs"> New Event</span>
      </Link>
      <button className="w-9 h-9 rounded-[8px] border border-[#F5F5F5] flex justify-center items-center hover:bg-[#F5F5F5] transition-colors duration-300 cursor-pointer">
        <Bell className="w-4.5 h-4.5" />
      </button>
    </div>
  );
};

export default NavbarActions;
