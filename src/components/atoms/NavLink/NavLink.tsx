"use client";

import { useActivePath } from "@/lib/hooks/useActivePath";
import { useEventAwareHref } from "@/lib/hooks/useEventAwareHref";
import Link from "next/link";

const NavLink = ({
  href,
  icon: Icon,
  title,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
}) => {
  const isActive = useActivePath(href);
  const eventAwareHref = useEventAwareHref(href);

  return (
    <li>
      <Link
        href={eventAwareHref}
        className={`rounded-[8px] py-1.25 px-2 flex gap-2 items-center text-sm font-geist text-[#262626] ${isActive ? "bg-[#EAECF0]" : "hover:bg-black/20 transition-all duration-300"}`}
      >
        <Icon className="w-4 h-4" />
        <span>{title}</span>
      </Link>
    </li>
  );
};

export default NavLink;
