"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

const PersonalAccountContent: React.FC = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id") || "1"; // default to user with id "1"
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3D334A] mb-4">
            Пользователь не найден
          </h2>
          <p className="text-[#846FA0]">Попробуйте другой ID пользователя</p>
        </div>
      </div>
    );
  }

  return (
    <div className="md:gap-20 px-4 md:px-5">
      <DesktopNavbar menuItems={defaultMenuItems} blogBg={false} />
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

const PersonalAccount: React.FC = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
            <h2 className="text-2xl font-semibold text-gray-700">
              იტვირთება...
            </h2>
          </div>
        </div>
      }
    >
      <PersonalAccountContent />
    </Suspense>
  );
};

export default PersonalAccount;
