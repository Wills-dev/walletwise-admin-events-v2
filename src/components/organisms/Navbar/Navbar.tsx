import Container from "@/components/atoms/Container/Container";
import NavbarActions from "@/components/molecules/NavbarActions/NavbarActions";

import { Menu } from "lucide-react";

const Navbar = ({
  toggleMenu,
  pageTitle,
}: {
  toggleMenu: () => void;
  pageTitle: string;
}) => {
  return (
    <header className="w-full border-b border-[#F5F5F5]">
      <Container>
        <div className="flex justify-between items-center gap-10 sm:h-20  h-16">
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMenu}
              className="lg:hidden block cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h6 className="font-semibold leading-6 text-[#262626]">
              {pageTitle}
            </h6>
          </div>
          <NavbarActions />
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
