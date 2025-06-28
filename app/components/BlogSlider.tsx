import Image from "next/image";
import { CiBookmark } from "react-icons/ci";
import { IoIosShareAlt } from "react-icons/io";

const BlogSlider = () => {
  return (
    <div className="md:mt-[50px] mt-5 w-full md:mb-20">
      <div className="flex md:flex-row flex-col gap-7 w-full md:flex-wrap overflow-x-auto md:overflow-x-visible px-0  snap-x snap-mandatory">
        <div className="hidden md:flex bg-white md:p-2 md:pb-5 md:min-h-[518px] w-[280px] md:w-auto flex-shrink-0 rounded-[20px]  flex-col justify-between snap-center">
          <div className="relative">
            <Image
              src={"/assets/images/blog1desktop.png"}
              width={674}
              height={232}
              alt="blogImage"
              className="w-full h-[100px] md:h-[232px] object-cover rounded-t-[20px]"
            />
            <h1 className="text-[#3D334A] md:mt-[29px] mt-3 md:mb-5 mb-2 text-[16px] md:text-[32px] leading-[120%] font-medium px-3">
              Ранние признаки рассеянного склероза
            </h1>
            <p className="text-[#846FA0] md:max-w-[650px] max-w-full font-medium leading-[120%] px-3 text-[12px] md:text-[16px] line-clamp-3">
              В результате повреждения миелина нервные сигналы не могут быстро и
              эффективно передаваться между ЦНС и остальным телом. Это может
              привести к различным симптомам, таким как нечеткость зрения, боль,
              необычные ощущения, мышечная слабость и многим другим аномальным
              симптомам.
            </p>
            <div className="flex items-center gap-1.5 flex-col absolute top-2 right-2">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 z-10 rounded-[6px] flex justify-center items-center">
                <CiBookmark
                  color="black"
                  width={12}
                  height={16}
                  className="md:w-[14.2px] md:h-[18.68px]"
                />
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE]/30 z-10 rounded-[6px] flex justify-center items-center">
                <IoIosShareAlt
                  color="black"
                  width={12}
                  height={16}
                  className="md:w-[14.2px] md:h-[18.68px]"
                />
              </div>
            </div>
          </div>
          <div className="px-3 pb-3">
            <span className="text-[#3D334A] p-1.5 md:p-2 bg-[#E9DFF6] rounded-[6px] leading-[90%] text-[14px] md:text-[18px] uppercase">
              Ортопедия
            </span>
          </div>
        </div>
        <div className="flex md:grid md:grid-cols-2 gap-5 md:flex-none flex-row md:flex-wrap overflow-x-auto md:overflow-x-visible snap-x snap-mandatory">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="md:w-[335px] w-[201px]  flex-shrink-0 md:p-5 p-3 bg-white flex flex-col justify-between md:rounded-[20px] rounded-[10px] snap-center"
            >
              <Image
                src={"/assets/images/blog1.png"}
                width={189}
                height={172}
                alt="blog1"
                className="flex md:hidden"
              />
              <p className="text-[#3D334A] text-[14px] md:text-[18px] leading-[120%] mt-2 line-clamp-2">
                Как физиотерапия остеопороза снижает риск переломов
              </p>
              <div className="flex justify-between items-center mt-2 md:mt-3">
                <span className="text-[#3D334A] p-1.5 md:p-2 bg-[#E9DFF6] rounded-[6px] leading-[90%] text-[14px] md:text-[18px] uppercase">
                  Ортопедия
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                    <CiBookmark
                      color="black"
                      width={12}
                      height={16}
                      className="md:w-[14.2px] md:h-[18.68px]"
                    />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#F9F7FE] rounded-[6px] flex justify-center items-center">
                    <IoIosShareAlt
                      color="black"
                      width={12}
                      height={16}
                      className="md:w-[14.2px] md:h-[18.68px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <span
          className="text-[#D4BAFC] leading-[90%] text-[15px] md:text-[24px] uppercase mt-4
        md:px-5 px-0 cursor-pointer"
        >
          {" "}
          Все 439 статей →
        </span>
      </div>
    </div>
  );
};

export default BlogSlider;
