import React from "react";
import Image from "next/image";

const Article = () => {
  return (
    <main className="flex justify-between  gap-[30px] text-[#3D334A]">
      <div className="p-5 bg-[rgba(255,255,255,1)] min-h-[700px] h-[700px] rounded-[20px] max-w-[335px] hidden md:block">
        <h2 className="text-lg font-semibold mb-4 text-[rgba(61,51,74,1)]">
          Содержание
        </h2>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-[rgba(61,51,74,1)]">1.</span>
            <span className="text-[rgba(61,51,74,1)] underline tracking-[-2%]">
              Что считается хорошим образом жизни?
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[rgba(61,51,74,1)]">2.</span>
            <span className="text-[rgba(61,51,74,1)] underline tracking-[-2%]">
              Что считается хорошим образом жизни?
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[rgba(61,51,74,1)]">3.</span>
            <span className="text-[rgba(61,51,74,1)] underline tracking-[-2%]">
              Что считается хорошим образом жизни?
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[rgba(61,51,74,1)]">4.</span>
            <span className="text-[rgba(61,51,74,1)] underline tracking-[-2%]">
              Что считается хорошим образом жизни?
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[rgba(61,51,74,1)]">5.</span>
            <span className="text-[rgba(61,51,74,1)] underline tracking-[-2%]">
              Что считается хорошим образом жизни?
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[rgba(61,51,74,1)]">6.</span>
            <span className="text-[rgba(61,51,74,1)] underline tracking-[-2%]">
              Что считается хорошим образом жизни?
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[rgba(61,51,74,1)] ">7.</span>
            <span className="text-[rgba(61,51,74,1)]  underline">
              Что считается хорошим образом жизни?
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[rgba(61,51,74,1)] ">8.</span>
            <span className="text-[rgba(61,51,74,1)]  underline">
              Что считается хорошим образом жизни?
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[rgba(61,51,74,1)] ">9.</span>
            <span className="text-[rgba(61,51,74,1)]  underline">
              Что считается хорошим образом жизни?
            </span>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-[rgba(61,51,74,1)]">10.</span>
            <span className="text-[rgba(61,51,74,1)] underline tracking-[-2%]">
              Что считается хорошим образом жизни?
            </span>
          </div>
        </div>
      </div>

      <div className="md:max-w-[690px] w-[690px]    mt-0 ">
        <section className=" bg-[rgba(255,255,255,1)] rounded-[20px] p-4">
          <header className=" hidden md:flex flex-col gap-[30px]">
            <div className="flex justify-between items-center ">
              <button className="bg-[rgba(233,223,246,1)] rounded-[6px] p-[8px] text-[18px] uppercase leading-[90%]">
                Ортопедия
              </button>
              <div className="flex justify-between items-center gap-[6px]">
                <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                  <Image
                    className=" w-[14px] h-[18px]"
                    src="/public/arrow-icon.png"
                    alt=""
                    width={14}
                    height={18}
                  />
                </div>
                <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                  <Image
                    className=" w-[14px] h-[18px]"
                    src="/public/arrow-icon.png"
                    alt=""
                    width={14}
                    height={18}
                  />
                </div>
              </div>
            </div>
            <section>
              <h2 className="text-[rgba(61,51,74,1)] leading-[120%] tracking-[0%] text-[32px] ">
                Курсы и мастер-классы для <br /> опытных терапевтов.
                <div className="br"></div> Практикум по лечению <br />{" "}
                ортопедических проблем
              </h2>
              <p className="text-[rgba(61,51,74,1)] leading-[120%] tracking-[0%] text-[16px] pt-6">
                С советами по безопасности, которым нужно следовать до и после
                перелома Кристен Гасник
              </p>
              <div className=" flex items-center gap-[30px] pt-[30px]">
                <span className="text-[rgba(61,51,74,1)] leading-[120%] tracking-[0%] text-[16px] font-medium">
                  12 комментариев
                </span>
                <span className="text-[rgba(61,51,74,1)] leading-[120%] tracking-[0%] text-[16px] font-medium">
                  2 минуты
                </span>
              </div>
            </section>
          </header>
          <section className=" md:mt-[60px] mt-[40px]">
            <h2 className="text-lg mb-[30px] text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%]">
              Что считается сидячим образом жизни?
            </h2>
            <p className="text-lg  mb-[30px] text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              Хотя не существует строгого определения того, что представляет
              собой малоподвижный образ жизни, у исследователей есть несколько
              различных показателей для измерения того, что такое сидячий образ
              жизни. Одним из показателей является время, которое человек
              проводит сидя или полулежа в часы бодрствования.{" "}
              <br className="mt-6" /> Казалось бы, разумно предположить, что те,
              кто соответствует требованиям к физической активности, не будут
              считаться малоподвижными. Однако исследования показывают, что даже
              те, кто соблюдает объем физической активности, рекомендованный
              Всемирной организацией здравоохранения (не менее 150 минут
              умеренной активности в течение недели или 75 минут интенсивной
              активности в неделю), все равно могут считаться ведущими
              малоподвижный образ жизни, если они проводят четыре часа в неделю.
              шесть часов сидения или лежания в день
            </p>
            <div className="p-4 bg-[rgba(212,186,252,1)] rounded-[10px] items-center">
              <p className="text-lg   text-[rgba(255,255,255,1)] md:leading-[100%] leading-[16s0%] tracking-[0%]">
                Проведение четырех-шести часов бодрствования сидя или лежа
                считается сидячим образом жизни.
              </p>
            </div>
          </section>
          <section className=" md:mt-[60px] mt-[40px]">
            <h2 className="text-lg mb-[30px] text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%]">
              Что считается сидячим образом жизни?
            </h2>
            <p className="text-lg  mb-[30px] text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              В краткосрочной перспективе бездействие может усилить депрессию
              или тревогу. Это также может повлиять на то, как организм
              перерабатывает жиры и сахара в рационе, и привести к некоторому
              увеличению веса, если вы не сжигаете достаточно калорий.{" "}
              <br className="mt-6" /> В долгосрочной перспективе малоподвижный
              образ жизни увеличивает риск смертности от сердечно-сосудистых
              заболеваний, диабета и рака. Помимо увеличения шансов умереть от
              этих причин, это также снижает качество жизни из-за усиления боли
              в коленях, более высокого уровня депрессии и снижения когнитивных
              функций.
            </p>
            <ul>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
            </ul>
            <p className="text-lg py-[30px] hidden md:block text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              В краткосрочной перспективе бездействие может усилить депрессию
              или тревогу. Это также может повлиять на то, как организм
              перерабатывает жиры и сахара в рационе, и привести к некоторому
              увеличению веса, если вы не сжигаете достаточно калорий.{" "}
              <br className="mt-6" /> В долгосрочной перспективе малоподвижный
              образ жизни увеличивает риск смертности от сердечно-сосудистых
              заболеваний, диабета и рака. Помимо увеличения шансов умереть от
              этих причин, это также снижает качество жизни из-за усиления боли
              в коленях, более высокого уровня депрессии и снижения когнитивных
              функций.
            </p>
          </section>
          <section className=" hidden md:grid grid-cols-[auto_1fr] gap-[10px] min-h-[288px] p-[10px] rounded-[20px] bg-[url('/bg2.png')] bg-no-repeat bg-cover bg-center">
            <div className="max-w-[400px] rounded-[10px] p-[10px] bg-[rgba(255,255,255,1)]">
              <h3 className="text-[20px] mb-[10px] text-[rgba(212,186,252,1)] leading-[120%] tracking-[0%]">
                Комплексы упражнений <br /> известных израильских <br />
                реабилитологов для <br /> занятий дома
              </h3>
              <div className="flex justify-center items-center gap-[6px]">
                <button className="bg-pink-500 flex justify-center items-center text-center px-3 py-[6px] text-[rgba(255,255,255,1)] rounded-[50px] text-[14px] leading-[90%] tracking-[-3%]">
                  Доступная цена
                </button>
                <button className="bg-yellow-500 flex justify-center items-center text-center px-3 py-[6px] text-[rgba(255,255,255,1)] rounded-[50px] text-[14px] leading-[90%] tracking-[-3%]">
                  Тестовая подписка от 90р
                </button>
              </div>
              <div>
                <p className="text-[20px] mb-[14px] pt-[30px] text-yellow-500 leading-[120%] tracking-[0%]">
                  Переходи и подписывайся <br /> на видео комплексы упражнений
                </p>
                <button className="bg-[rgba(212,186,252,1)] max-w-[196px] flex justify-center items-center text-center px-[35px] py-[13px] text-[rgba(255,255,255,1)] rounded-[50px] text-[14px] leading-[90%] tracking-[-3%]">
                  Доступная цена
                </button>
              </div>
            </div>
            <Image
              className="object-contain w-full h-full"
              src="/public/girl.png"
              alt=""
              width={14}
              height={18}
            />
          </section>
          <section>
            <p className="text-lg py-[30px] hidden md:block text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              В краткосрочной перспективе бездействие может усилить депрессию
              или тревогу. Это также может повлиять на то, как организм
              перерабатывает жиры и сахара в рационе, и привести к некоторому
              увеличению веса, если вы не сжигаете достаточно калорий.{" "}
              <br className="mt-6" /> В долгосрочной перспективе малоподвижный
              образ жизни увеличивает риск смертности от сердечно-сосудистых
              заболеваний, диабета и рака. Помимо увеличения шансов умереть от
              этих причин, это также снижает качество жизни из-за усиления боли
              в коленях, более высокого уровня депрессии и снижения когнитивных
              функций. <br />В долгосрочной перспективе малоподвижный образ
              жизни увеличивает риск смертности от сердечно-сосудистых
              заболеваний, диабета и рака. Помимо увеличения шансов умереть от
              этих причин, это также снижает качество жизни из-за усиления боли
              в коленях, более высокого уровня депрессии и снижения когнитивных
              функций.Помимо увеличения шансов умереть от этих причин.
            </p>
          </section>
          <section className="p-4 md:hidden">
            <div className="max-w-[319px] max-h-[213px] rounded-[10px] overflow-hidden">
              <Image
                src="/public/reabilitation.png"
                alt="reabilitation hand picture"
                className="w-full h-full rounded-[10px] object-cover"
                width={319}
                height={213}
              />
            </div>
          </section>
          <section>
            <p className="text-lg py-[30px] md:hidden  text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              Хотя не существует строгого определения того, что представляет
              собой малоподвижный образ жизни, у исследователей есть несколько
              различных показателей для измерения того, что такое сидячий образ
              жизни. Одним из показателей является время, которое человек
              проводит сидя или полулежа в часы бодрствования.
              <br className="mt-6" /> Казалось бы, разумно предположить, что те,
              кто соответствует требованиям к физической активности, не будут
              считаться малоподвижными. Однако исследования показывают, что даже
              те, кто соблюдает объем физической активности, рекомендованный
              Всемирной организацией здравоохранения (не менее 150 минут
              умеренной активности в течение недели или 75 минут интенсивной
              активности в неделю), все равно могут считаться ведущими
              малоподвижный образ жизни, если они проводят четыре часа в неделю.
              шесть часов сидения или лежания в день
            </p>
          </section>
          <section className=" hidden md:block md:mt-[60px] mt-[40px]">
            <h2 className="text-lg mb-[30px] text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%]">
              Что считается сидячим образом жизни?
            </h2>
            <p className="text-lg  mb-[30px] text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              Хотя не существует строгого определения того, что представляет
              собой малоподвижный образ жизни, у исследователей есть несколько
              различных показателей для измерения того, что такое сидячий образ
              жизни. Одним из показателей является время, которое человек
              проводит сидя или полулежа в часы бодрствования.{" "}
              <br className="mt-6" /> Казалось бы, разумно предположить, что те,
              кто соответствует требованиям к физической активности, не будут
              считаться малоподвижными. Однако исследования показывают, что даже
              те, кто соблюдает объем физической активности, рекомендованный
              Всемирной организацией здравоохранения (не менее 150 минут
              умеренной активности в течение недели или 75 минут интенсивной
              активности в неделю), все равно могут считаться ведущими
              малоподвижный образ жизни, если они проводят четыре часа в неделю.
              шесть часов сидения или лежания в день
            </p>
            <div className="p-4 bg-[rgba(212,186,252,1)] rounded-[10px] items-center">
              <p className="text-lg   text-[rgba(255,255,255,1)] md:leading-[100%] leading-[16s0%] tracking-[0%]">
                Проведение четырех-шести часов бодрствования сидя или лежа
                считается сидячим образом жизни.
              </p>
            </div>
          </section>
          <section className=" md:mt-[60px] mt-[40px]">
            <h2 className="text-lg mb-[30px] text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%]">
              Что считается сидячим образом жизни?
            </h2>
            <p className="text-lg  mb-[30px] text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              В краткосрочной перспективе бездействие может усилить депрессию
              или тревогу. Это также может повлиять на то, как организм
              перерабатывает жиры и сахара в рационе, и привести к некоторому
              увеличению веса, если вы не сжигаете достаточно калорий.{" "}
              <br className="mt-6" /> В долгосрочной перспективе малоподвижный
              образ жизни увеличивает риск смертности от сердечно-сосудистых
              заболеваний, диабета и рака. Помимо увеличения шансов умереть от
              этих причин, это также снижает качество жизни из-за усиления боли
              в коленях, более высокого уровня депрессии и снижения когнитивных
              функций.
            </p>
            <ul>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
            </ul>
            <p className="text-lg py-[30px] hidden md:block text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              В краткосрочной перспективе бездействие может усилить депрессию
              или тревогу. Это также может повлиять на то, как организм
              перерабатывает жиры и сахара в рационе, и привести к некоторому
              увеличению веса, если вы не сжигаете достаточно калорий.{" "}
              <br className="mt-6" /> В долгосрочной перспективе малоподвижный
              образ жизни увеличивает риск смертности от сердечно-сосудистых
              заболеваний, диабета и рака. Помимо увеличения шансов умереть от
              этих причин, это также снижает качество жизни из-за усиления боли
              в коленях, более высокого уровня депрессии и снижения когнитивных
              функций.
            </p>
          </section>
          <section className="p-4 hidden md:block">
            <div className="max-w-[630px] max-h-[309px] rounded-[10px] overflow-hidden">
              <Image
                src="/public/reabilitation.png"
                alt="reabilitation hand picture"
                className="w-full h-full rounded-[10px] object-cover"
                width={630}
                height={309}
              />
            </div>
          </section>
          <section>
            <p className="text-lg py-[30px] md:block hidden  text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              В краткосрочной перспективе бездействие может усилить депрессию
              или тревогу. Это также может повлиять на то, как организм
              перерабатывает жиры и сахара в рационе, и привести к некоторому
              увеличению веса, если вы не сжигаете достаточно калорий.
              <br className="mt-6" /> В долгосрочной перспективе малоподвижный
              образ жизни увеличивает риск смертности от сердечно-сосудистых
              заболеваний, диабета и рака. Помимо увеличения шансов умереть от
              этих причин, это также снижает качество жизни из-за усиления боли
              в коленях, более высокого уровня депрессии и снижения когнитивных
              функций. В долгосрочной перспективе малоподвижный образ жизни
              увеличивает риск смертности от сердечно-сосудистых заболеваний,
              диабета и рака. Помимо увеличения шансов умереть от этих причин,
              это также снижает качество жизни из-за усиления боли в коленях,
              более высокого уровня депрессии и снижения когнитивных
              функций.Помимо увеличения шансов умереть от этих причин.
            </p>
          </section>
          <section className=" hidden md:block md:mt-[60px] mt-[40px]">
            <h2 className="text-lg mb-[30px] text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%]">
              Что считается сидячим образом жизни?
            </h2>
            <p className="text-lg  mb-[30px] text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              Хотя не существует строгого определения того, что представляет
              собой малоподвижный образ жизни, у исследователей есть несколько
              различных показателей для измерения того, что такое сидячий образ
              жизни. Одним из показателей является время, которое человек
              проводит сидя или полулежа в часы бодрствования.{" "}
              <br className="mt-6" /> Казалось бы, разумно предположить, что те,
              кто соответствует требованиям к физической активности, не будут
              считаться малоподвижными. Однако исследования показывают, что даже
              те, кто соблюдает объем физической активности, рекомендованный
              Всемирной организацией здравоохранения (не менее 150 минут
              умеренной активности в течение недели или 75 минут интенсивной
              активности в неделю), все равно могут считаться ведущими
              малоподвижный образ жизни, если они проводят четыре часа в неделю.
              шесть часов сидения или лежания в день
            </p>
            <div className="p-4 bg-[rgba(212,186,252,1)] rounded-[10px] items-center">
              <p className="text-lg   text-[rgba(255,255,255,1)] md:leading-[100%] leading-[16s0%] tracking-[0%]">
                Проведение четырех-шести часов бодрствования сидя или лежа
                считается сидячим образом жизни.
              </p>
            </div>
          </section>
          <section className=" hidden md:block md:mt-[60px] mt-[40px]">
            <h2 className="text-lg mb-[30px] text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%]">
              Что считается сидячим образом жизни?
            </h2>
            <p className="text-lg  mb-[30px] text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              В краткосрочной перспективе бездействие может усилить депрессию
              или тревогу. Это также может повлиять на то, как организм
              перерабатывает жиры и сахара в рационе, и привести к некоторому
              увеличению веса, если вы не сжигаете достаточно калорий.{" "}
              <br className="mt-6" /> В долгосрочной перспективе малоподвижный
              образ жизни увеличивает риск смертности от сердечно-сосудистых
              заболеваний, диабета и рака. Помимо увеличения шансов умереть от
              этих причин, это также снижает качество жизни из-за усиления боли
              в коленях, более высокого уровня депрессии и снижения когнитивных
              функций.
            </p>
            <ul>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
              <li className="flex items-center  gap-4">
                <div className=" bg-[rgba(212,186,252,1)] rounded-[50%] w-[10px] h-[10px]"></div>
                <span className="text-lg text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Элемент списка
                </span>
              </li>
            </ul>
            <p className="text-lg py-[30px] hidden md:block text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
              В краткосрочной перспективе бездействие может усилить депрессию
              или тревогу. Это также может повлиять на то, как организм
              перерабатывает жиры и сахара в рационе, и привести к некоторому
              увеличению веса, если вы не сжигаете достаточно калорий.{" "}
              <br className="mt-6" /> В долгосрочной перспективе малоподвижный
              образ жизни увеличивает риск смертности от сердечно-сосудистых
              заболеваний, диабета и рака. Помимо увеличения шансов умереть от
              этих причин, это также снижает качество жизни из-за усиления боли
              в коленях, более высокого уровня депрессии и снижения когнитивных
              функций.
            </p>
          </section>
          <section className="p-4 hidden md:block">
            <div className="max-w-[630px] max-h-[309px] rounded-[10px] overflow-hidden">
              <Image
                src="/public/reabilitation.png"
                alt="reabilitation hand picture"
                className="w-full h-full rounded-[10px] object-cover"
                width={630}
                height={309}
              />
            </div>
          </section>
          <section className="p-4 hidden md:block">
            <div className="max-w-[630px] max-h-[309px] rounded-[10px] overflow-hidden">
              <Image
                src="/public/reabilitation.png"
                alt="reabilitation hand picture"
                className="w-full h-full rounded-[10px] object-cover"
                width={630}
                height={309}
              />
            </div>
          </section>
          <section className="p-4 hidden md:block">
            <div className="max-w-[630px] max-h-[309px] rounded-[10px] overflow-hidden">
              <Image
                src="/public/reabilitation.png"
                alt="reabilitation hand picture"
                className="w-full h-full rounded-[10px] object-cover"
                width={630}
                height={309}
              />
            </div>
          </section>
          <section className="p-4 hidden md:block">
            <div className="max-w-[630px] max-h-[309px] rounded-[10px] overflow-hidden">
              <Image
                src="/public/reabilitation.png"
                alt="reabilitation hand picture"
                className="w-full h-full rounded-[10px] object-cover"
                width={630}
                height={309}
              />
            </div>
          </section>
        </section>
        <section className="md:max-w-[690px] px-5 pt-5 md:pb-[40px] pb-6  bg-[rgba(255,255,255,1)] rounded-[20px]  mt-5 ">
          <h2 className="md:text-2xl text-[18px] text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%] md:mb-[40px] mb-5">
            Оценить статью
          </h2>
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-[4.16px] md:gap-6">
              <div className="max-w-[55.5px] max-h-[50.7px] rounded-[10px] overflow-hidden">
                <Image
                  src="/public/star-icon.png"
                  alt="reabilitation hand picture"
                  className="w-full h-full rounded-[10px] object-cover"
                  width={55.55}
                  height={50.7}
                />
              </div>
              <div className="max-w-[55.5px] max-h-[50.7px] rounded-[10px] overflow-hidden">
                <Image
                  src="/public/star-icon.png"
                  alt="reabilitation hand picture"
                  className="w-full h-full rounded-[10px] object-cover"
                  width={55.55}
                  height={50.7}
                />
              </div>
              <div className="max-w-[55.5px] max-h-[50.7px] rounded-[10px] overflow-hidden">
                <Image
                  src="/public/star-icon.png"
                  alt="reabilitation hand picture"
                  className="w-full h-full rounded-[10px] object-cover"
                  width={55.55}
                  height={50.7}
                />
              </div>
              <div className="max-w-[55.5px] max-h-[50.7px] rounded-[10px] overflow-hidden">
                <Image
                  src="/public/star-icon.png"
                  alt="reabilitation hand picture"
                  className="w-full h-full rounded-[10px] object-cover"
                  width={55.55}
                  height={50.7}
                />
              </div>
              <div className="max-w-[55.5px] max-h-[50.7px] rounded-[10px] overflow-hidden">
                <Image
                  src="/public/star-icon.png"
                  alt="reabilitation hand picture"
                  className="w-full h-full rounded-[10px] object-cover"
                  width={55.55}
                  height={50.7}
                />
              </div>
            </div>
            <div className="flex flex-col md:justify-center items-center gap-[4.16px]">
              <h4 className="md:text-[32px] text-lg text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%]">
                4.7
              </h4>
              <span className="md:text-[16px] text-[10px] text-[rgba(213,209,219,1)] leading-[100%] tracking-[-1%]">
                (26 оценок)
              </span>
            </div>
          </div>
        </section>
        <section className=" md:max-w-[690px] px-5 pt-5 md:pb-[40px] pb-6  bg-[rgba(255,255,255,1)] rounded-[20px]  mt-5 ">
          <h2 className="md:text-2xl text-[18px] text-[rgba(61,51,74,1)] leading-[100%] tracking-[-1%] md:mb-[40px] mb-5">
            Комментарии
          </h2>
          <form className="max-w-[650px] mx-auto relative">
            <input
              type="text"
              placeholder="Введите ваш комментарий"
              className="w-full p-4 text-lg font-medium border-2 rounded-lg outline-none border-[rgba(249,247,254,1)] transition-colors bg-transparent leading-none tracking-normal placeholder:text-[rgba(226,204,255,1)]"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
          <hr className=" h-[2px] w-full bg-[rgba(249,247,254,1)] mt-[40px] border-none md:mb-5 mb-0" />
          <div className=" flex flex-col gap-5">
            <div className="flex gap-5 items-start max-w-[650px] bg-[rgba(249,247,254,1)] rounded-[20px] p-4">
              <div className="w-[50px] h-[50px] rounded-[10px] bg-gray-300 flex-shrink-0 overflow-hidden">
                <Image
                  src="/public/avatar.jpg"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                  width={50}
                  height={50}
                />
              </div>

              <div className="flex-1">
                <div className="mb-3">
                  <h3 className=" text-[rgba(61,51,74,1)] text-sm md:[18px]">
                    АЛЕКСЕЙ АНАТОЛЬЕВ
                  </h3>
                  <p className="text-gray-500 text-xs">12.03.2023 15:16</p>
                </div>

                <p className="md:text-[18px] text-[16px]  text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Статья просто нечто! Для меня оказалась очень полезной, т.к я
                  работаю программистом и постоянно сижу дома. Спасибо!
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-start max-w-[650px] bg-[rgba(249,247,254,1)] rounded-[20px] p-4">
              <div className="w-[50px] h-[50px] rounded-[10px] bg-gray-300 flex-shrink-0 overflow-hidden">
                <Image
                  src="/public/avatar.jpg"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                  width={50}
                  height={50}
                />
              </div>

              <div className="flex-1">
                <div className="mb-3">
                  <h3 className=" text-[rgba(61,51,74,1)] text-sm md:[18px]">
                    АЛЕКСЕЙ АНАТОЛЬЕВ
                  </h3>
                  <p className="text-gray-500 text-xs">12.03.2023 15:16</p>
                </div>

                <p className="md:text-[18px] text-[16px]  text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Статья просто нечто! Для меня оказалась очень полезной, т.к я
                  работаю программистом и постоянно сижу дома. Спасибо!
                </p>
              </div>
            </div>
            <div className="flex gap-5 items-start max-w-[650px] bg-[rgba(249,247,254,1)] rounded-[20px] p-4">
              <div className="w-[50px] h-[50px] rounded-[10px] bg-gray-300 flex-shrink-0 overflow-hidden">
                <Image
                  src="/public/avatar.jpg"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                  width={50}
                  height={50}
                />
              </div>

              <div className="flex-1">
                <div className="mb-3">
                  <h3 className=" text-[rgba(61,51,74,1)] text-sm md:[18px]">
                    АЛЕКСЕЙ АНАТОЛЬЕВ
                  </h3>
                  <p className="text-gray-500 text-xs">12.03.2023 15:16</p>
                </div>

                <p className="md:text-[18px] text-[16px]  text-[rgba(132,111,160,1)] md:leading-[140%] leading-[16s0%] tracking-[-1%]">
                  Статья просто нечто! Для меня оказалась очень полезной, т.к я
                  работаю программистом и постоянно сижу дома. Спасибо!
                </p>
              </div>
            </div>
          </div>
          <button className=" block m-auto py-[17.5px] w-[319px] mt-[40px] max-w-[343px] md:w-[343px] bg-[rgba(212,186,252,1)] rounded-[10px] items-center text-lg   text-[rgba(255,255,255,1)] md:leading-[100%] leading-[16s0%] tracking-[0%]">
            Показать ещё
          </button>
        </section>
      </div>

      <div className=" md:flex flex-col hidden">
        <div className=" w-[335px] bg-[rgba(255,255,255,1)] p-5 flex flex-col justify-between rounded-[20px] h-[249px]  mb-5">
          <p>Как физиотерапия остеопороза снижает риск переломов</p>
          <div className="flex justify-between items-center ">
            <button className="bg-[rgba(233,223,246,1)] rounded-[6px] p-[8px] text-[18px] uppercase leading-[90%]">
              Ортопедия
            </button>
            <div className="flex justify-between items-center gap-[6px]">
              <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                <Image
                  className=" w-[14px] h-[18px]"
                  src="/public/arrow-icon.png"
                  alt=""
                  width={14}
                  height={18}
                />
              </div>
              <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                <Image
                  className=" w-[14px] h-[18px]"
                  src="/public/arrow-icon.png"
                  alt=""
                  width={14}
                  height={18}
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" w-[335px] bg-[rgba(255,255,255,1)] p-5 flex flex-col justify-between rounded-[20px] h-[249px] mb-5">
          <p>Как физиотерапия остеопороза снижает риск переломов</p>
          <div className="flex justify-between items-center ">
            <button className="bg-[rgba(233,223,246,1)] rounded-[6px] p-[8px] text-[18px] uppercase leading-[90%]">
              Ортопедия
            </button>
            <div className="flex justify-between items-center gap-[6px]">
              <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                <Image
                  className=" w-[14px] h-[18px]"
                  src="/public/arrow-icon.png"
                  alt=""
                  width={14}
                  height={18}
                />
              </div>
              <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                <Image
                  className=" w-[14px] h-[18px]"
                  src="/public/arrow-icon.png"
                  alt=""
                  width={14}
                  height={18}
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" w-[335px] bg-[rgba(255,255,255,1)] p-5 flex flex-col justify-between rounded-[20px] h-[249px] mb-5">
          <p>Как физиотерапия остеопороза снижает риск переломов</p>
          <div className="flex justify-between items-center ">
            <button className="bg-[rgba(233,223,246,1)] rounded-[6px] p-[8px] text-[18px] uppercase leading-[90%]">
              Ортопедия
            </button>
            <div className="flex justify-between items-center gap-[6px]">
              <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                <Image
                  className=" w-[14px] h-[18px]"
                  src="/public/arrow-icon.png"
                  alt=""
                  width={14}
                  height={18}
                />
              </div>
              <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                <Image
                  className=" w-[14px] h-[18px]"
                  src="/public/arrow-icon.png"
                  alt=""
                  width={14}
                  height={18}
                />
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/public/mobileAppPic.png"
          alt="mobile app ilustration"
          className="mx-[17.5px] mb-5"
          width={14}
          height={18}
        />

        <div className=" w-[335px] bg-[rgba(255,255,255,1)] p-5 flex flex-col justify-between rounded-[20px] h-[249px] mb-5">
          <p>Как физиотерапия остеопороза снижает риск переломов</p>
          <div className="flex justify-between items-center ">
            <button className="bg-[rgba(233,223,246,1)] rounded-[6px] p-[8px] text-[18px] uppercase leading-[90%]">
              Ортопедия
            </button>
            <div className="flex justify-between items-center gap-[6px]">
              <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                <Image
                  className=" w-[14px] h-[18px]"
                  src="/public/arrow-icon.png"
                  alt=""
                  width={14}
                  height={18}
                />
              </div>
              <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                <Image
                  className=" w-[14px] h-[18px]"
                  src="/public/arrow-icon.png"
                  alt=""
                  width={14}
                  height={18}
                />
              </div>
            </div>
          </div>
        </div>

        <div className=" w-[335px] bg-[rgba(255,255,255,1)] p-5 flex flex-col justify-between rounded-[20px] h-[249px] mb-5">
          <p>Как физиотерапия остеопороза снижает риск переломов</p>
          <div className="flex justify-between items-center ">
            <button className="bg-[rgba(233,223,246,1)] rounded-[6px] p-[8px] text-[18px] uppercase leading-[90%]">
              Ортопедия
            </button>
            <div className="flex justify-between items-center gap-[6px]">
              <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                <Image
                  className=" w-[14px] h-[18px]"
                  src="/public/arrow-icon.png"
                  alt=""
                  width={14}
                  height={18}
                />
              </div>
              <div className=" w-[40px] h-[40px] rounded-[6px] bg-[rgba(233,223,246,1)] flex items-center justify-center">
                <Image
                  className=" w-[14px] h-[18px]"
                  src="/public/arrow-icon.png"
                  alt=""
                  width={14}
                  height={18}
                />
              </div>
            </div>
          </div>
        </div>

        <Image
          src="/public/mobileAppPic.png"
          alt="mobile app ilustration"
          className="mx-[17.5px] mb-5"
          width={14}
          height={18}
        />
      </div>
    </main>
  );
};

export default Article;
