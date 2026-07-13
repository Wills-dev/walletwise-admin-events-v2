import Image from "next/image";
import React from "react";

const AuthLayout = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="min-h-screen h-screen bg-linear-to-b from-0% from-[#341C69] to-100% to-[#6637CF] w-full">
      <div className="flex justify-center items-center h-full">
        <div className="max-w-98.5 w-full min-w-72.5 bg-white p-6 rounded-[16px] sm:gap-7 gap-5">
          <div className="flex justify-center w-full">
            <div className="w-15 h-15 rounded-[14.69px] bg-[#EBE3FD]">
              <Image
                src="/assets/images/logo.svg"
                alt=""
                width={60}
                height={60}
                priority
                className="object-contain"
              />
            </div>
          </div>
          <p className="font-semibold sm:text-xl text-lg">{title}</p>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
