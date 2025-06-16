"use client";
import React, { useState } from "react";

import { SimpleLogo } from "../Logo";
import NavbarIconButton from "./NavbarIconButton";
import LanguageSelector from "./LanguageSelector";

interface MenuItem {
  id: number;
  name: string;
}

interface DesktopNavbarProps {
  menuItems: MenuItem[];
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({ menuItems }) => {
  const [language, setLanguage] = useState("RU");

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 my-4 w-full md:flex hidden justify-between px-10 py-5">
        <div className="min-w-[800px] flex p-3.5 items-center rounded-[20px] bg-gradient-to-br from-[rgba(94,43,143,0.4)] to-[rgba(61,51,74,0.3)] shadow-xl border border-white/10">
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
          <LanguageSelector
            currentLanguage={language}
            onSelectLanguage={setLanguage}
          />
          <NavbarIconButton src="/assets/images/store.svg" alt="Store" />
          <NavbarIconButton src={"/assets/images/person.svg"} alt="Person" />
        </div>
      </header>
    </>
  );
};

export default DesktopNavbar;
