export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  image: string;
  goals: {
    currentStreak: number;
    recordStreak: number;
    calendarIntegration: string;
  };
  statistics: {
    label: string;
    text: string;
    icon?: React.ComponentType<{ className?: string }>;
    id?: string;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    image?: string;
    imageBg?: string;
    current?: number;
    total?: number;
  }[];
};

import { FaRegCheckCircle, FaStar } from "react-icons/fa";

export const users: User[] = [
  {
    id: "1",
    name: "Алексей Анатольев",
    email: "anatoliev@gmail.com",
    phone: "+7 (932) 584–20–82",
    location: "Москва, Московская область, Россия",
    image: "/assets/images/personImage.png",
    goals: {
      currentStreak: 4,
      recordStreak: 18,
      calendarIntegration: "google",
    },
    statistics: [
      {
        id: "aa1",
        label: "6 комплексов",
        text: "Просмотрено",
        icon: FaRegCheckCircle,
      },
      { id: "aa2", label: "12 уроков", text: "Пройдено", icon: FaStar },
    ],
    achievements: [
      {
        id: "a1",
        title: "Первый шаг",
        description: "Завершить первый курс",
        image: "/assets/images/rocket.png",
        imageBg: "#F3D57F",
        current: 1,
        total: 10,
      },
      {
        id: "a2",
        title: "Настойчивость",
        description: "Заниматься 7 дней подряд",
        image: "/assets/images/trophy.png",
        imageBg: "#B1E5FC",
        current: 6,
        total: 7,
      },
    ],
  },
  {
    id: "2",
    name: "Марина Иванова",
    email: "marina.ivanova@example.com",
    phone: "+7 (999) 123–45–67",
    location: "Санкт-Петербург, Россия",
    image: "/assets/images/personImage2.png",
    goals: {
      currentStreak: 7,
      recordStreak: 20,
      calendarIntegration: "apple",
    },
    statistics: [
      { label: "8 комплексов", text: "Просмотрено", icon: FaRegCheckCircle },
      { label: "15 уроков", text: "Пройдено", icon: FaStar },
    ],
    achievements: [
      {
        id: "a1",
        title: "Первый шаг",
        description: "Завершить первый курс",
        image: "/assets/images/rocket.png",
        imageBg: "#F3D57F",
        current: 3,
        total: 10,
      },
      {
        id: "a2",
        title: "Настойчивость",
        description: "Заниматься 7 дней подряд",
        image: "/assets/images/trophy.png",
        imageBg: "#B1E5FC",
        current: 7,
        total: 7,
      },
    ],
  },
];
