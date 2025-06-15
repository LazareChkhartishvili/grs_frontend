import React from "react";
import IconButton from "./IconButton";
import { MobileLogo } from "./Logo";
import burger from "../../assets/images/burger.svg";
import store from "../../assets/images/store.svg";

const MobileNavbar = () => (
  <header className="px-2 py-6 md:hidden">
    <div className="px-2 py-[10px] flex justify-between items-center rounded-[20px] bg-gradient-to-br from-[rgba(94,43,143,0.4)] to-[rgba(61,51,74,0.3)]">
      <IconButton src={burger} alt="Burger" />
      <MobileLogo />
      <IconButton src={store} alt="Store" />
    </div>

    {/* Indicator bars */}
    <div className="max-w-[313px] mt-6 flex gap-2 mx-auto">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`bg-white w-[72.25px] h-[4px] rounded-[20px] ${
            i === 0 ? "" : "opacity-20"
          }`}
        />
      ))}
    </div>
  </header>
);

export default MobileNavbar;
