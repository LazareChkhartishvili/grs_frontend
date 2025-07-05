"use client";
import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { defaultMenuItems } from "../components/Header";
import PersonInfo from "../components/PersonalAccount/PersonInfo";
import PersonGoals from "../components/PersonalAccount/PersonGoals";
import Achievements from "../components/Achievements";
import Statistics from "../components/Statistics";
import DaysInRow from "../components/PersonalAccount/DaysInRow";
import ContinueWatchingBanner from "../components/PersonalAccount/ContinueWatchingBanner";
import Tabs from "../components/Tabs";
import { useAuth } from "../context/AuthContext";

const tabItems = [
  { label: "Описание", href: "#description" },
  { label: "Дополнительно", href: "#extra" },
  { label: "Демо-видео", href: "#demo" },
];

// Dummy data for other components
const dummyData = {
  goals: {
    currentStreak: 5,
    recordStreak: 10,
    calendarIntegration: "google"
  },
  statistics: [
    { label: "Общее время", text: "24:00:00" },
    { label: "Упражнения", text: "150 упражнений" },
    { label: "Среднее время", text: "00:45:00" }
  ],
  achievements: [
    { 
      id: "first-exercise",
      title: "Первое упражнение", 
      description: "Успешно завершили первое упражнение",
      current: 1,
      total: 1
    },
    { 
      id: "five-day-streak",
      title: "5 дней подряд", 
      description: "Тренировались 5 дней подряд",
      current: 5,
      total: 5
    },
    { 
      id: "professional",
      title: "Профессионал", 
      description: "Завершили 50 упражнений",
      current: 25,
      total: 50
    }
  ]
};

const PersonalAccountContent: React.FC = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-600 border-t-transparent mb-4 mx-auto"></div>
          <h2 className="text-2xl font-semibold text-gray-700">
            Загрузка...
          </h2>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3D334A] mb-4">
            Пользователь не найден
          </h2>
          <p className="text-[#846FA0]">Необходима авторизация</p>
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
          <PersonGoals goals={dummyData.goals} />
          <DaysInRow
            currentStreak={dummyData.goals.currentStreak}
            recordStreak={dummyData.goals.recordStreak}
            multiplier={2}
            timer="18:45:24"
          />
        </div>
        <Statistics statistics={dummyData.statistics} />
        <Achievements achievements={dummyData.achievements} />
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
              Загрузка...
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
