"use client";
import React from "react";
import { CiPlay1 } from "react-icons/ci";
import Header from "../components/Header";
import Subscribe from "../components/Subscribe";
import ReviewSlider from "../components/ReviewSlider";
import BlogSlider from "../components/BlogSlider";
import Professional from "../components/Professional";
import Tabs from "../components/Tabs";
import Modal from "../components/Modal";
import { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { CiLock } from "react-icons/ci";

const Complex = () => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const playBtnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  // Close popover when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        playBtnRef.current &&
        !playBtnRef.current.contains(event.target as Node)
      ) {
        setPopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverOpen]);
  const [modalOpen, setModalOpen] = useState(false);
  const tabItems = [
    { label: "Описание", href: "#description" },
    { label: "Дополнительно", href: "#extra" },
    { label: "Демо-видео", href: "#demo" },
  ];
  return (
    <div>
      <Header variant="complex" onPriceClick={() => setPopoverOpen(true)} />
      <div className="">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 md:mt-40 px-4">
          <Tabs
            items={tabItems}
            activeTabIndex={activeTabIndex}
            onTabClick={setActiveTabIndex}
          />
        </section>
        {/* ტაბების ქვემოთ იცვლება მხოლოდ კონტენტი */}
        <div className="px-4 py-8">
          {activeTabIndex === 0 && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20">
              {/* მთავარი კომპლექსის ბლოკები, popover და ა.შ. */}
              <div className="order-3 md:order-2 p-4 md:p-[40px] md:mb-20 bg-[rgba(249,247,254,1)] rounded-[20px] md:rounded-[30px]">
                <div className="flex flex-col md:gap-5 gap-4 pb-6 md:pb-[80px]">
                  <strong className="text-[rgba(61,51,74,1)] tracking-[-3%] leading-[120%] text-[18px] md:text-[40px] font-medium">
                    Комплекс состоит <br /> из 8 упражнений,
                    <br /> общая длительность комплекса <br />
                    39:38 мин
                  </strong>
                  <span className="text-[rgba(132,111,160,1)] md:text-2xl text-[16px] leading-[120%] font-medium">
                    Необходимые аксессуары: стул устойчивый <br />
                    со спинкой, гимнастический коврик
                  </span>
                </div>
                <div>
                  <h4 className="mb-[10px] text-[rgba(61,51,74,1)] tracking-[-1%] leading-[100%] text-[18px] ">
                    Общие указания:
                  </h4>
                  <p className="text-[rgba(132,111,160,1)] md:text-[18px] tex-[14px] leading-[150%]  ">
                    В соответсвии со стадией прогрессирования болезни необходимо
                    выстроить комплекс и программу реабилитационных упражнений.В
                    соответсвии со стадией прогрессирования болезни необходимо
                    выстроить комплекс и программу реабилитационных упражнений
                    <br className="mb-[20px]" /> В соответсвии со стадией
                    прогрессирования болезни необходимо выстроить комплекс и
                    программу реабилитационных упражнений.В соответсвии со
                    стадией прогрессирования болезни необходимо выстроить
                    комплекс и программу
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-3 flex flex-col md:gap-4 gap-5">
                <div className="relative  bg-[url('/assets/images/blog.png')] bg-cover bg-center bg-no-repeat p-5 rounded-[10px] flex justify-between items-center">
                  <div className="flex md:flex-row md:gap-[40px] flex-col  md:items-center">
                    <h3 className="text-[rgba(255,255,255,1))] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                      Начальный уровень
                    </h3>
                    <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                      10 упражнений
                    </span>
                  </div>
                  <button ref={playBtnRef} className="relative z-10">
                    <CiPlay1
                      size={20}
                      color="white"
                      className="hover:text-[#846FA0] hover:text-2xl hover:scale-125"
                    />
                  </button>
                  {popoverOpen && (
                    <div
                      ref={popoverRef}
                      className="absolute right-0 -top-72 mt-2 bg-white shadow-lg rounded-2xl p-0 min-w-[320px] max-w-[90vw] border border-purple-200 z-20 flex flex-col items-stretch"
                    >
                      {/* 1 месяц */}
                      <div className="flex justify-between items-center px-6 py-4 border-b border-[rgba(132,111,160,0.12)]">
                        <span className="font-bold cursor-pointer text-[18px] leading-[120%] tracking-[-2%] text-[rgba(61,51,74,1)] uppercase">
                          1 месяц
                        </span>
                        <span className="text-[16px] text-[rgba(132,111,160,1)] font-medium">
                          100 ₽/мес
                        </span>
                      </div>
                      {/* 3 месяца - highlight */}
                      <div className="flex justify-between items-center px-6 py-4 border-b border-[rgba(132,111,160,0.12)] bg-[rgba(132,111,160,0.08)]">
                        <span className="font-bold cursor-pointer text-[18px] leading-[120%] tracking-[-2%] text-[rgba(132,111,160,1)] uppercase">
                          3 месяца
                        </span>
                        <div className="flex flex-col items-end">
                          <span className="text-[20px] cursor-pointer font-bold text-[rgba(132,111,160,1)] leading-[120%]">
                            350 ₽/мес
                          </span>
                          <span className="text-[14px] cursor-pointer text-[rgba(132,111,160,0.5)] line-through font-medium">
                            350 ₽/мес
                          </span>
                        </div>
                      </div>
                      {/* 6 месяцев */}
                      <div className="flex justify-between items-center px-6 py-4 border-b border-[rgba(132,111,160,0.12)]">
                        <span className="font-bold text-[18px] cursor-pointer leading-[120%] tracking-[-2%] text-[rgba(61,51,74,1)] uppercase">
                          6 месяцев
                        </span>
                        <span className="text-[16px] cursor-pointer text-[rgba(132,111,160,1)] font-medium">
                          500 ₽/мес
                        </span>
                      </div>
                      {/* 12 месяцев */}
                      <div className="flex justify-between items-center px-6 py-4">
                        <span className="font-bold text-[18px] cursor-pointer leading-[120%] tracking-[-2%] text-[rgba(61,51,74,1)] uppercase">
                          12 месяцев
                        </span>
                        <span className="text-[16px] cursor-pointer text-[rgba(132,111,160,1)] font-medium">
                          500 ₽/мес
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-[rgba(249,247,254,1)]  p-5 rounded-[10px] flex justify-between items-center">
                  <div className="flex md:flex-row md:gap-[40px] flex-col  md:items-center">
                    <h3 className="text-[rgba(132,111,160,1)] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                      Средний уровень
                    </h3>
                    <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                      10 упражнений
                    </span>

                    <CiLock
                      color="#846FA0"
                      className="absolute right-8"
                      size={24}
                    />
                  </div>
                  {/* <Image src="../../public/block-icon.png" alt="block icon" /> */}
                  <CiPlay1 width={19.28} height={25.44} />
                </div>
                <div className="bg-[rgba(249,247,254,1)]  p-5 rounded-[10px] flex justify-between items-center">
                  <div className="flex md:flex-row md:gap-[40px] flex-col md:items-center">
                    <h3 className="text-[rgba(132,111,160,1)] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                      Продвинутый уровень
                    </h3>
                    <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                      10 упражнений
                    </span>
                    <CiLock
                      color="#846FA0"
                      className="absolute right-8"
                      size={24}
                    />
                  </div>
                </div>
              </div>
            </section>
          )}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20">
            <div className="order-3 md:order-2 p-4 md:p-[40px] md:mb-20 bg-[rgba(249,247,254,1)] rounded-[20px] md:rounded-[30px]">
              {activeTabIndex === 1 && (
                <div className="text-lg text-[rgba(61,51,74,1)] md:px-10 md:py-5 bg-[#F9F7FE] rounded-[20px]">
                  <h1 className="md:text-[40px] leading-[120%] tracking-[-3%] text-[#3D334A]">
                    Дополнительно
                  </h1>
                  <p className="font-[Pt] text-[18px] leading-[120%] text-[#846FA0] mt-10">
                    В краткосрочной перспективе бездействие может усилить
                    депрессию или тревогу. Это также может повлиять на то, как
                    организм перерабатывает жиры и сахара в рационе, и привести
                    к некоторому увеличению веса, если вы не сжигаете достаточно
                    калорий.
                  </p>
                  <p className="font-[Pt] text-[18px] leading-[120%] text-[#846FA0] mt-5">
                    В долгосрочной перспективе малоподвижный образ жизни
                    увеличивает риск смертности от сердечно-сосудистых
                    заболеваний, диабета и рака. Помимо увеличения шансов
                    умереть от этих причин, это также снижает качество жизни
                    из-за усиления боли в коленях, более высокого уровня
                    депрессии и снижения когнитивных функций.
                  </p>
                  <ul className="list-disc mx-5 flex flex-col gap-[10px] mt-5">
                    <li className="font-[Pt] text-[18px] leading-[140%] tracking-[-1%] text-[#846FA0]">
                      Элемент списка
                    </li>
                    <li className="font-[Pt] text-[18px] leading-[140%] tracking-[-1%] text-[#846FA0]">
                      Элемент списка
                    </li>
                    <li className="font-[Pt] text-[18px] leading-[140%] tracking-[-1%] text-[#846FA0]">
                      Элемент списка
                    </li>
                    <li className="font-[Pt] text-[18px] leading-[140%] tracking-[-1%] text-[#846FA0]">
                      Элемент списка
                    </li>
                    <li className="font-[Pt] text-[18px] leading-[140%] tracking-[-1%] text-[#846FA0]">
                      Элемент списка
                    </li>
                  </ul>
                </div>
              )}
              {activeTabIndex === 2 && (
                <div className="text-lg text-[rgba(61,51,74,1)]">
                  <h1 className="md:text-[40px] leading-[120%] tracking-[-3%] mb-5">
                    Демо-видео
                  </h1>
                  <div className="rounded-[15px] overflow-hidden shadow-lg">
                    <ReactPlayer
                      src="/videos/hero.mp4"
                      controls
                      width="100%"
                      height="360px"
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="order-1 md:order-3 flex flex-col md:gap-4 gap-5">
              <div className="relative  bg-[url('/assets/images/blog.png')] bg-cover bg-center bg-no-repeat p-5 rounded-[10px] flex justify-between items-center">
                <div className="flex md:flex-row md:gap-[40px] flex-col  md:items-center">
                  <h3 className="text-[rgba(255,255,255,1))] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                    Начальный уровень
                  </h3>
                  <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                    10 упражнений
                  </span>
                </div>
                <button ref={playBtnRef} className="relative z-10">
                  <CiPlay1
                    size={20}
                    color="white"
                    className="hover:text-[#846FA0] hover:text-2xl hover:scale-125"
                  />
                </button>
                {popoverOpen && (
                  <div
                    ref={popoverRef}
                    className="absolute right-0 -top-72 mt-2 bg-white shadow-lg rounded-2xl p-0 min-w-[320px] max-w-[90vw] border border-purple-200 z-20 flex flex-col items-stretch"
                  >
                    {/* 1 месяц */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[rgba(132,111,160,0.12)]">
                      <span className="font-bold cursor-pointer text-[18px] leading-[120%] tracking-[-2%] text-[rgba(61,51,74,1)] uppercase">
                        1 месяц
                      </span>
                      <span className="text-[16px] text-[rgba(132,111,160,1)] font-medium">
                        100 ₽/мес
                      </span>
                    </div>
                    {/* 3 месяца - highlight */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[rgba(132,111,160,0.12)] bg-[rgba(132,111,160,0.08)]">
                      <span className="font-bold cursor-pointer text-[18px] leading-[120%] tracking-[-2%] text-[rgba(132,111,160,1)] uppercase">
                        3 месяца
                      </span>
                      <div className="flex flex-col items-end">
                        <span className="text-[20px] cursor-pointer font-bold text-[rgba(132,111,160,1)] leading-[120%]">
                          350 ₽/мес
                        </span>
                        <span className="text-[14px] cursor-pointer text-[rgba(132,111,160,0.5)] line-through font-medium">
                          350 ₽/мес
                        </span>
                      </div>
                    </div>
                    {/* 6 месяцев */}
                    <div className="flex justify-between items-center px-6 py-4 border-b border-[rgba(132,111,160,0.12)]">
                      <span className="font-bold text-[18px] cursor-pointer leading-[120%] tracking-[-2%] text-[rgba(61,51,74,1)] uppercase">
                        6 месяцев
                      </span>
                      <span className="text-[16px] cursor-pointer text-[rgba(132,111,160,1)] font-medium">
                        500 ₽/мес
                      </span>
                    </div>
                    {/* 12 месяцев */}
                    <div className="flex justify-between items-center px-6 py-4">
                      <span className="font-bold text-[18px] cursor-pointer leading-[120%] tracking-[-2%] text-[rgba(61,51,74,1)] uppercase">
                        12 месяцев
                      </span>
                      <span className="text-[16px] cursor-pointer text-[rgba(132,111,160,1)] font-medium">
                        500 ₽/мес
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-[rgba(249,247,254,1)]  p-5 rounded-[10px] flex justify-between items-center">
                <div className="flex md:flex-row md:gap-[40px] flex-col  md:items-center">
                  <h3 className="text-[rgba(132,111,160,1)] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                    Средний уровень
                  </h3>
                  <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                    10 упражнений
                  </span>

                  <CiLock
                    color="#846FA0"
                    className="absolute right-8"
                    size={24}
                  />
                </div>
                {/* <Image src="../../public/block-icon.png" alt="block icon" /> */}
                <CiPlay1 width={19.28} height={25.44} />
              </div>
              <div className="bg-[rgba(249,247,254,1)]  p-5 rounded-[10px] flex justify-between items-center">
                <div className="flex md:flex-row md:gap-[40px] flex-col md:items-center">
                  <h3 className="text-[rgba(132,111,160,1)] md:text-2xl text-[18px] leading-[120%] tracking-[-3%] uppercase">
                    Продвинутый уровень
                  </h3>
                  <span className="text-[rgba(132,111,160,1)] md:text-[14px] text-xs leading-[90%] tracking-[0%] uppercase">
                    10 упражнений
                  </span>
                  <CiLock
                    color="#846FA0"
                    className="absolute right-8"
                    size={24}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <Subscribe />
        <ReviewSlider />
        <BlogSlider currentPage={0} blogsPerPage={0} />
        <Professional />
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <div className="flex flex-col items-center justify-center min-w-[250px] min-h-[120px]">
            <h2 className="text-xl font-bold mb-4">Модальное окно</h2>
            <p>Здесь будет ваш контент (например, видео ან სხვა ინფორმაცია).</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Complex;
