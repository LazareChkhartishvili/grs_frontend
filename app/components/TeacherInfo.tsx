import Image from "next/image";
import { PiStudent } from "react-icons/pi";

const TeacherInfo = () => {
  return (
    <div>
      <div className="md:flex-row flex">
        <div className="mx-2 px-2 md:px-5 flex flex-col md:flex-row">
          <Image
            src={"/assets/images/user1.png"}
            width={343}
            height={282}
            alt="user1"
            className="rounded-[15px] mb-4 md:mr-10 md:w-[295px] md:h-[295px]"
          />
          <div className="md:mb-20 flex flex-col md:gap-10">
            <div className="text-[#3D334A] flex flex-col gap-2.5">
              <h1 className="md:text-[32px] md:leading-[120%]">ААРОН ЯКОБИ</h1>
              <p className="md:font-medium md:leading-[120%]">
                Основатель и руководитель «Колледжа медицинского массажа»
                Dr.Аарон Якоби, Ph.D, C.A., P.T.
              </p>
            </div>

            {/*  */}
            <div className="flex flex-col gap-5 mt-5 md:flex-row">
              <div className="rounded-[20px] border border-[#E2CCFF] w-[343px]  md:py-10 md:h-[158px] py-6 flex items-center justify-center flex-col">
                <PiStudent color="#D4BAFC" size={28} />
                <h5 className="text-[#D4BAFC]">Курсы преподавателя</h5>
              </div>
              <div className="rounded-[20px] border border-[#E2CCFF] w-[343px] md:py-10 md:h-[158px] py-6 flex items-center justify-center flex-col">
                <PiStudent color="#D4BAFC" size={28} />
                <h5 className="text-[#D4BAFC]">Курсы преподавателя</h5>
              </div>
              <div className="rounded-[20px] border border-[#E2CCFF] w-[343px] md:py-10 md:h-[158px] py-6 flex items-center justify-center flex-col">
                <PiStudent color="#D4BAFC" size={28} />
                <h5 className="text-[#D4BAFC]">Курсы преподавателя</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfo;
