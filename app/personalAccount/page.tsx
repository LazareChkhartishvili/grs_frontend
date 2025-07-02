import React from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { defaultMenuItems } from "../components/Header";
import PersonInfo from "../components/PersonalAccount/PersonInfo";
import PersonGoals from "../components/PersonalAccount/PersonGoals";
import Achievements from "../components/Achievements";
import Statistics from "../components/Statistics";
import DaysInRow from "../components/PersonalAccount/DaysInRow";
import { users } from "../data/dummyUsers";
import ContinueWatchingBanner from "../components/PersonalAccount/ContinueWatchingBanner";
import Tabs from "../components/Tabs";

const tabItems = [
  { label: "Описание", href: "#description" },
  { label: "Дополнительно", href: "#extra" },
  { label: "Демо-видео", href: "#demo" },
];

type Props = {
  userId: string;
};

const PersonalAccount: React.FC<Props> = ({ userId }) => {
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className="md:gap-20 px-4 md:px-5">
      <DesktopNavbar menuItems={defaultMenuItems} />
      <MobileNavbar />
      <ContinueWatchingBanner />
      <div className="md:mt-10 mb-[100px]">
        <PersonInfo user={user} />
        <Tabs items={tabItems} />
        <div className="mx-2 md:mx-10 md:mt-10 mt-0 flex flex-col gap-3 md:flex-row-reverse">
          <PersonGoals goals={user.goals} />
          <DaysInRow
            currentStreak={user.goals.currentStreak}
            recordStreak={user.goals.recordStreak}
            multiplier={2}
            timer="18:45:24"
          />
        </div>
        <Statistics statistics={user.statistics} />
        <Achievements achievements={user.achievements} />
      </div>
    </div>
  );
};

export default PersonalAccount;
