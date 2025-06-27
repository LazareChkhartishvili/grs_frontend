import React from "react";
import Header from "../components/Header";
import Category from "../components/Category";
import Rehabilitation from "../components/Rehabilitation";
import Works from "../components/Works";
import TeacherInfo from "../components/TeacherInfo";

const About = () => {
  return (
    <div>
      <Header />
      <div className="mt-40">
        <Rehabilitation />
        <Category />
        <Works />
        <div className="py-10">
          <h1 className="text-[#3D334A] text-[64px] leading-[100%] tracking-[-3%]  text-center">
            Наша цель
          </h1>
          <div className="m-10">
            <div className="bg-[#F9F7FE] py-[34px] pl-10 mb-5 rounded-[15px]">
              <p className="text-[#3D334A] leading-[120%] text-[24px] font-medium">
                Мы нацелены на постоянное расширение списка направлений
                реабилитации и персонализацию программ реабилитации, и будем
                рады обратной связи с нашими пользователями, чтобы определиться
                какие разделы реабилитации нам нужно добавить и какие
                дополнительные возможности следует развить.
              </p>
            </div>
            <div className="flex flex-row items-center gap-5">
              <div className="bg-[#F9F7FE] p-10 rounded-[15px]">
                <p className="text-[#3D334A] leading-[120%] text-[24px] font-medium">
                  Мы обеспечим вам возможность бесплатных консультаций с
                  квалифицированными кураторами нашей платформы, а также
                  возможность консультаций с ведущими специалистами в клиниках
                  Израиля.
                </p>
              </div>
              <div className="bg-[#F9F7FE] p-10 rounded-[15px]">
                <p className="text-[#3D334A] leading-[120%] text-[24px] font-medium">
                  Мы обеспечим вам возможность бесплатных консультаций с
                  квалифицированными кураторами нашей платформы, а также
                  возможность консультаций с ведущими специалистами в клиниках
                  Израиля.
                </p>
              </div>
            </div>
          </div>
        </div>
        <TeacherInfo />
      </div>
    </div>
  );
};

export default About;
