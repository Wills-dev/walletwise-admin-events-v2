import CrownIcon from "@/components/atoms/icons/CrownIcon";
import NavLink from "@/components/atoms/NavLink/NavLink";
import EventDropdown from "@/components/molecules/EventDropdown/EventDropdown";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCurrentPartner } from "@/lib/hooks/useGetCurrentPartner";
import { useLogout } from "@/lib/hooks/useLogout";

import {
  Banknote,
  LayoutDashboard,
  LogOut,
  Settings,
  Ticket,
  X,
} from "lucide-react";

const Sidebar = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const { logout, isLoggingOut } = useLogout();
  const { currentUser, isLoading } = useGetCurrentPartner();

  const sidebarLinks = [
    { href: "/overview", title: "overview", icon: LayoutDashboard },
    { href: "/tickets", title: "Tickets", icon: Ticket },
    { href: "/revenue", title: "Revenue", icon: Banknote },
    { href: "/settings", title: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`h-screen fixed max-w-64 w-full transition-transform duration-500 ease-out bg-[#F9FAFB] border-r border-[#F0F0F0] p-2 ${!isOpen ? "max-lg:-translate-x-64" : "max-lg:translate-0"}`}
    >
      <div className="flex flex-col justify-between gap-10 h-full">
        <div className="space-y-2">
          <div className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2.5 font-geist">
              <div className="w-10 h-10 rounded-[11.11px] flex justify-center items-center bg-black text-[18px] text-white">
                <CrownIcon />
              </div>
              <div className="space-y-0.5">
                {isLoading && !currentUser ? (
                  <Skeleton className="h-5 w-24" />
                ) : (
                  <h6 className="text-sm font-semibold leading-5.25">
                    {currentUser?.company_name}
                  </h6>
                )}
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
            <EventDropdown
              events={currentUser?.events ?? []}
              isLoading={isLoading && currentUser?.events === undefined}
            />
            <ul className="space-y-1">
              {sidebarLinks?.map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  icon={item.icon}
                />
              ))}
            </ul>
          </div>
        </div>
        <button
          onClick={logout}
          disabled={isLoggingOut}
          className="flex items-center gap-2 text-red-500 hover:text-red-700 transition-all duration-300 cursor-pointer text-sm font-geist"
        >
          <LogOut className="w-4 h-4" />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
