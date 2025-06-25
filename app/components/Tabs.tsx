type TabItem = {
  label: string;
  href: string;
};

type TabsProps = {
  items: TabItem[];
  className?: string; // სურვილისამებრ, დამატებითი კლასებისთვის
};

import React from "react";

const Tabs = ({ items, className = "" }: TabsProps) => {
  return (
    <div
      className={`md:col-span-2 order-2 md:order-1 bg-[rgba(233,223,246,1)] md:p-[40px] p-4 rounded-[20px] flex md:gap-[40px] gap-6 items-center relative ${className}`}
    >
      {items.map((item, index) => (
        <div className="relative group" key={index}>
          <a
            href={item.href}
            className="text-[rgba(132,111,160,1)] md:text-2xl text-[14px] leading-[90%] md:leading-[120%] tracking-[0%] uppercase group-hover:text-[rgba(61,51,74,1)]"
          >
            {item.label}
          </a>
          <div className="absolute left-0 -bottom-[42px] h-[2px] w-full bg-[rgba(61,51,74,1)] scale-x-0 group-hover:scale-x-100 origin-left transition-transform"></div>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
