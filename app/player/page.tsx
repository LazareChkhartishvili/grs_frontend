"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import { defaultMenuItems } from "../components/Header";
import Image from "next/image";

// ----- Types -----
type Step = {
  step: number;
  title: string;
  list: string[];
  image?: string;
};
type ExerciseStatus = "done" | "waiting" | "locked";
type Exercise = {
  id: number;
  title: string;
  steps: Step[];
  status: ExerciseStatus;
};

// ----- Data -----
const exercises: Exercise[] = [
  {
    id: 1,
    title: "УПРАЖНЕНИЕ 1. СГИБАНИЕ КОЛЕН В СУСТАВАХ",
    steps: [
      {
        step: 1,
        title: "Шаг 1: Начальная позиция",
        list: [
          "Встаньте прямо, ноги на ширине плеч.",
          "Руки можно держать вдоль тела или на бедрах для баланса.",
        ],
        image: "/assets/images/blog1.png",
      },
      {
        step: 2,
        title: "Шаг 2: Сгибание колен",
        list: [
          "Сгибайте колени до тех пор, пока бедра не будут параллельны полу. Нижняя точка сгибания коленей может быть ниже, но не ниже, чем параллельно полу.",
          "Верхняя часть движения – возвращение в начальное положение, выпрямление ног до конечной точки.",
        ],
        image: "/assets/images/blog1.png",
      },
    ],
    status: "done",
  },
  {
    id: 2,
    title: "УПРАЖНЕНИЕ 2. СГИБАНИЕ КОЛЕН В СУСТАВАХ",
    steps: [
      {
        step: 1,
        title: "Шаг 1: Начальная позиция",
        list: [
          "Встаньте прямо, ноги на ширине плеч.",
          "Руки можно держать вдоль тела или на бедрах для баланса.",
        ],
        image: "/assets/images/blog1.png",
      },
      {
        step: 2,
        title: "Шаг 2: Сгибание колен",
        list: [
          "Сгибайте колени до тех пор, пока бедра не будут параллельны полу. Нижняя точка сгибания коленей может быть ниже, но не ниже, чем параллельно полу.",
          "Верхняя часть движения – возвращение в начальное положение, выпрямление ног до конечной точки.",
        ],
        image: "/assets/images/blog1.png",
      },
    ],
    status: "done",
  },
  {
    id: 3,
    title: "УПРАЖНЕНИЕ 3. СГИБАНИЕ КОЛЕН В СУСТАВАХ",
    steps: [
      {
        step: 1,
        title: "Шаг 1: Начальная позиция",
        list: [
          "Встаньте прямо, ноги на ширине плеч.",
          "Руки можно держать вдоль тела или на бедрах для баланса.",
        ],
        image: "/assets/images/blog1.png",
      },
      {
        step: 2,
        title: "Шаг 2: Сгибание колен",
        list: [
          "Сгибайте колени до тех пор, пока бедра не будут параллельны полу. Нижняя точка сгибания коленей может быть ниже, но не ниже, чем параллельно полу.",
          "Верхняя часть движения – возвращение в начальное положение, выпрямление ног до конечной точки.",
        ],
        image: "/assets/images/blog1.png",
      },
    ],
    status: "waiting",
  },
  {
    id: 4,
    title: "УПРАЖНЕНИЕ 4. СГИБАНИЕ КОЛЕН В СУСТАВАХ",
    steps: [
      {
        step: 1,
        title: "Шаг 1: Начальная позиция",
        list: [
          "Встаньте прямо, ноги на ширине плеч.",
          "Руки можно держать вдоль тела или на бедрах для баланса.",
        ],
        image: "/assets/images/blog1.png",
      },
      {
        step: 2,
        title: "Шаг 2: Сгибание колен",
        list: [
          "Сгибайте колени до тех пор, пока бедра не будут параллельны полу. Нижняя точка сгибания коленей может быть ниже, но не ниже, чем параллельно полу.",
          "Верхняя часть движения – возвращение в начальное положение, выпрямление ног до конечной точки.",
        ],
        image: "/assets/images/blog1.png",
      },
    ],
    status: "locked",
  },
];

// ----- Status Map -----
const statusMap = {
  done: {
    label: "Просмотрено",
    line: "rgba(243, 213, 127, 1)",
    badge: "bg-yellow-200 text-yellow-700 border-yellow-300",
    bg: "rgba(255, 236, 180, 1)",
  },
  waiting: {
    label: "Ожидает просмотра",
    line: "rgba(212, 186, 252, 1)",
    badge: "bg-purple-100 text-purple-800 border-purple-300",
    bg: "rgba(232, 213, 255, 1)",
  },
  locked: {
    label: "Посмотрите предыдущее упражнение",
    line: "rgba(241, 238, 246, 1)",
    badge: "bg-gray-100 text-gray-400 border-gray-200",
    bg: "rgba(241, 238, 246, 1)",
  },
};

const numberTextColor = "rgba(61, 51, 74, 1)";
const mobileNumberBg = "rgba(213, 209, 219, 1)";
const markerSize = 48; // px
const markerOffset = 32; // px, ბარათის padding-top

const Player = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [centers, setCenters] = useState<number[]>([]);

  useLayoutEffect(() => {
    // ვპოულობთ თითოეული ნომრის ცენტრის top პოზიციას მშობლის მიმართ
    setCenters(
      cardRefs.current.map((el) =>
        el ? el.offsetTop + markerOffset + markerSize / 2 : 0
      )
    );
  }, []);
  return (
    <div>
      <DesktopNavbar menuItems={defaultMenuItems} />
      <section className="w-full flex flex-col items-center bg-[#F9F7FE] min-h-screen py-6 px-2">
        <div className="relative w-full max-w-3xl flex flex-col gap-6">
          {/* Desktop: ვერტიკალური ხაზის სეგმენტები */}
          <div
            className="hidden md:block absolute left-[22px] w-[6px] z-0"
            style={{ top: 0, bottom: 0, pointerEvents: "none" }}
          >
            {centers.length > 1 &&
              centers.slice(0, -1).map((center, idx) => {
                const nextCenter = centers[idx + 1];
                if (center === 0 || nextCenter === 0) return null;
                return (
                  <div
                    key={idx}
                    style={{
                      position: "absolute",
                      left: 0,
                      width: "6px",
                      top: center,
                      height: nextCenter - center,
                      background: statusMap[exercises[idx + 1].status].line,
                      borderRadius: 3,
                    }}
                  />
                );
              })}
          </div>

          {exercises.map((exercise, idx) => (
            <div
              key={exercise.id}
              className="relative flex"
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
            >
              {/* Desktop: ნომერი ზუსტად ხაზის ცენტრში */}
              <div
                className="hidden md:block absolute left-0 z-10"
                style={{
                  top: markerOffset,
                  width: markerSize + 8,
                  height: markerSize,
                }}
              >
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-full font-semibold text-lg shadow-sm"
                  style={{
                    background: statusMap[exercise.status].bg,
                    color: numberTextColor,
                    border: "none",
                    fontSize: 22,
                  }}
                >
                  {exercise.id}
                </div>
              </div>
              {/* Main Card */}
              <article
                className={`relative z-10 flex-1 ml-0 md:ml-[68px] ${
                  exercise.status === "locked" ? "opacity-50" : ""
                }`}
              >
                <div className="w-full rounded-2xl shadow-md p-4 md:p-6 bg-white mb-4 flex flex-col relative">
                  {/* Desktop: header row */}
                  <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-2 gap-3 md:gap-0">
                    <h2
                      className={`font-bold text-base md:text-lg ${
                        exercise.status === "locked"
                          ? "text-gray-400"
                          : "text-gray-900"
                      }`}
                    >
                      {exercise.title}
                    </h2>
                    {/* Desktop only: სტატუსის ბეჯი */}
                    <span
                      className={`hidden md:flex items-center px-3 py-1 rounded-lg border text-xs font-medium ml-2 ${
                        statusMap[exercise.status].badge
                      }`}
                    >
                      {statusMap[exercise.status].label}
                    </span>
                  </header>

                  {/* Mobile only: სტატუსის ბეჯი სათაურის ქვემოთ */}
                  <span
                    className={`md:hidden inline-flex items-center px-3 py-1 rounded-lg border text-xs font-medium mb-4 self-start ${
                      statusMap[exercise.status].badge
                    }`}
                  >
                    {statusMap[exercise.status].label}
                  </span>

                  {/* Steps */}
                  <div className="flex flex-col gap-4">
                    {exercise.steps.map((step, stepIdx) => (
                      <section
                        key={step.step}
                        className="flex flex-col sm:flex-row gap-2 items-start"
                      >
                        {step.image && (
                          <div className="relative w-full sm:w-32 flex-shrink-0 mb-2 sm:mb-0 overflow-hidden">
                            <Image
                              width={128}
                              height={100}
                              src={step.image}
                              alt={`Шаг ${step.step}`}
                              className="w-full h-32 object-cover rounded-lg border border-gray-200"
                            />
                            {/* Mobile: Step number on each image */}
                            <div
                              className="md:hidden absolute z-20"
                              style={{ top: "-5px", left: "20px" }}
                            >
                              <div
                                className="flex items-center justify-center w-7 h-7 rounded-full font-semibold text-base shadow"
                                style={{
                                  background: mobileNumberBg,
                                  color: numberTextColor,
                                  border: "none",
                                }}
                              >
                                {exercise.id}
                              </div>
                            </div>
                          </div>
                        )}
                        <div>
                          <h3
                            className={`font-semibold text-[15px] mb-1 ${
                              stepIdx === 0
                                ? "text-purple-600"
                                : "text-purple-500"
                            } ${
                              exercise.status === "locked"
                                ? "text-gray-400"
                                : ""
                            }`}
                          >
                            {step.title}
                          </h3>
                          <ol
                            className={`list-decimal pl-4 text-sm ${
                              exercise.status === "locked"
                                ? "text-gray-400"
                                : "text-gray-800"
                            }`}
                          >
                            {step.list.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ol>
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Player;
