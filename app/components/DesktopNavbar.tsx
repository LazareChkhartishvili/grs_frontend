import Image from "next/image";
import React from "react";
import IconButton from "./NavbarIconButton";
import { SimpleLogo } from "./Logo";

interface MenuItem {
  id: number;
  name: string;
}

interface DesktopNavbarProps {
  menuItems: MenuItem[];
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ menuItems }) => (
  <header className="p-5  w-full md:flex hidden justify-between">
    <div className="min-w-[780px] flex p-3.5 items-center rounded-[20px] bg-gradient-to-br from-[rgba(94,43,143,0.4)] to-[rgba(61,51,74,0.3)]">
      <SimpleLogo />
      <ul className="flex ml-[89px] mr-[73px] justify-between w-full">
        {menuItems.map(({ id, name }) => (
          <li
            key={id}
            className="text-white text-[18px] leading-[100%] tracking-[-1%]"
          >
            {name}
          </li>
        ))}
      </ul>
    </div>

    <div className="flex items-center gap-4 ml-4">
      <div className="w-[70px] h-[70px] flex items-center gap-1 justify-center rounded-[20px] cursor-pointer bg-gradient-to-br from-[rgba(94,43,143,0.4)] to-[rgba(61,51,74,0.3)]">
        <h4 className="text-white">RU</h4>
        <Image
          src={"/assets/images/dropDown.svg"}
          alt="dropDown"
          width={9}
          height={5}
        />
      </div>
      <IconButton src="/assets/images/store.svg" alt="Store" />
      <IconButton src={"/assets/images/person.svg"} alt="Person" />
    </div>
  </header>
);

export default DesktopNavbar;
