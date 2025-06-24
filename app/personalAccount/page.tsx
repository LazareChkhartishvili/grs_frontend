import React from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { defaultMenuItems } from "../components/Header";
import ContinueWatchingBanner from "../components/PersonalAccount/ContinueWatchingBanner";
import PersonGoals from "../components/PersonalAccount/PersonGoals";
import DaysInRow from "../components/PersonalAccount/DaysInRow";
import PersonInfo from "../components/PersonalAccount/PersonInfo";

const PersonalAccount = () => {
  return (
    <div>
      <DesktopNavbar menuItems={defaultMenuItems} />
      <MobileNavbar />
      <ContinueWatchingBanner />
      <div className="mx-2 md:mx-10 md:mt-10 flex flex-col gap-3  md:flex-row-reverse">
        <PersonGoals />
        <DaysInRow />
      </div>
      <PersonInfo />
    </div>
  );
};

export default PersonalAccount;
