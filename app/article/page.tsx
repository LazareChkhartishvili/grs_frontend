import React from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import { defaultMenuItems } from "../components/Header";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import Article from "../components/Article";
import Image from "next/image";

const page = () => {
  return (
    <div className="bg-[#F9F7FE]">
      <DesktopNavbar menuItems={defaultMenuItems} blogBg={false} />
      <MobileNavbar />
      <div className="mx-10">
        <Image
          src={"/assets/images/article.jpg"}
          width={1400}
          height={518}
          alt="article"
          className="w-full max-w-full h-[518px] object-cover rounded-[40px] mb-10"
        />
        <Article />
      </div>
    </div>
  );
};

export default page;
