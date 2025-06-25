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

const PersonalAccount = () => {
  const tabItems = [
    { label: "Мои курсы", href: "#Моикурсы" },
    { label: "Достижения", href: "#Достижения" },
    { label: "история подписок", href: "#история подписок" },
  ];
  return (
    <div className="md:gap-20 px-4 md:px-10">
      <DesktopNavbar menuItems={defaultMenuItems} />
      <MobileNavbar />
      <ContinueWatchingBanner />
      <div className="mx-2 md:mx-10 md:mt-10 mt-0 flex flex-col gap-3  md:flex-row-reverse">
        <PersonGoals />
        <DaysInRow />
      </div>
      <PersonInfo />
      <Tabs items={tabItems} className="md:mx-10 mx-2" />
      <CourseContents />
      <Statistics />
    </div>
  );
};

export default PersonalAccount;
