"use client";

import { useState } from "react";

import Sidebar from "@/components/organisms/Sidebar/Sidebar";
import Navbar from "@/components/organisms/Navbar/Navbar";
import Container from "@/components/atoms/Container/Container";

const MainLayout = ({
  children,
  pageTitle,
}: {
  children: React.ReactNode;
  pageTitle: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-full h-full min-h-sreen overflow-hidden">
      <Sidebar isOpen={isOpen} toggleMenu={toggleMenu} />
      <div className="flex">
        <div className="hidden lg:block w-64 min-w-64" />
        <div className="flex-1 w-full">
          <Navbar toggleMenu={toggleMenu} pageTitle={pageTitle} />
          <Container className="pt-6 pb-16">{children}</Container>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
