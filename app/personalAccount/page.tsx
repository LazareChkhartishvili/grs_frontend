import React from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { defaultMenuItems } from "../components/Header";
import ContinueWatchingBanner from "../components/PersonalAccount/ContinueWatchingBanner";
import PersonGoals from "../components/PersonalAccount/PersonGoals";
import DaysInRow from "../components/PersonalAccount/DaysInRow";
import PersonInfo from "../components/PersonalAccount/PersonInfo";
import Tabs from "../components/Tabs";
import CourseContents from "../components/CourseContents";
import Statistics from "../components/Statistics";
import Achievements from "../components/Achievements";
import { FaMedal } from "react-icons/fa";
import { users } from "../data/dummyUsers";

const PersonalAccount = () => {
  const tabItems = [
    { label: "Мои курсы", href: "#Моикурсы" },
    { label: "Достижения", href: "#Достижения" },
    { label: "история подписок", href: "#история подписок" },
  ];
  return (
    <div className="md:gap-20 px-4 md:px-5">
      <DesktopNavbar menuItems={defaultMenuItems} />
      <MobileNavbar />
      <div className="md:mt-10 mb-[100px]">
        <ContinueWatchingBanner />
        <div className="mx-2 md:mx-10 md:mt-10 mt-0 flex flex-col gap-3  md:flex-row-reverse">
          <PersonGoals />
          <DaysInRow />
        </div>
        <PersonInfo user={users[2]} />
        <Tabs items={tabItems} className="md:mx-10 mx-2" />
        <CourseContents />
        <Statistics />
        <Achievements />
        <div className="flex items-end w-full justify-end ">
          <button className="text-white bg-[#D4BAFC] mt-10 w-[630px] py-[17px] hidden md:flex justify-between items-center px-5 cursor-pointer rounded-[8px]">
            Поделиться статистикой и достижениями
            <FaMedal color="white" />
          </button>
        </div>
        <button className="md:hidden flex bg-[#D4BAFC] w-[327px] items-center justify-center mt-8 rounded-[8px] cursor-pointer text-white text-[18px] leading-[100%] tracking-[-1%] py-[17px] text-center">
          Показать еще
        </button>
      </div>
    </div>
  );
};

export default PersonalAccount;
