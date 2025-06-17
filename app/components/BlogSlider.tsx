import Image from "next/image";

const BlogSlider = () => {
  return (
    <div className="bg-white pb-3 px-1.5 mt-5 flex items-center gap-[14px] overflow-x-auto scrollbar-hide">
      <div>
        <Image
          src={"/assets/images/blog1.png"}
          width={189}
          height={172}
          alt="blogImage"
        />
        <p className="text-[#3D334A] mt-4 text-[14px] leading-[120%] font-medium">
          Как физиотерапия остеопороза снижает риск переломов
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-[#3D334A] text-[10px] leading-[90%]">
            Ортопедия
          </span>
          <div className="flex items-center gap-1.5">
            <div className="bg-[#F9F7FE] w-6 h-6 flex justify-center items-center">
              <Image
                src={"/assets/images/bookmark.png"}
                width={10}
                height={7}
                alt="shareIcon"
              />
            </div>
            <div className="bg-[#F9F7FE] w-6 h-6 flex justify-center items-center">
              <Image
                src={"/assets/images/share.png"}
                width={12}
                height={9}
                alt="shareIcon"
              />
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div>
        <Image
          src={"/assets/images/blog1.png"}
          width={189}
          height={172}
          alt="blogImage"
        />
        <p className="text-[#3D334A] mt-4 text-[14px] leading-[120%] font-medium">
          Как физиотерапия остеопороза снижает риск переломов
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-[#3D334A] text-[10px] leading-[90%]">
            Ортопедия
          </span>
          <div className="flex items-center gap-1.5">
            <div className="bg-[#F9F7FE] w-6 h-6 flex justify-center items-center">
              <Image
                src={"/assets/images/bookmark.png"}
                width={10}
                height={7}
                alt="shareIcon"
              />
            </div>
            <div className="bg-[#F9F7FE] w-6 h-6 flex justify-center items-center">
              <Image
                src={"/assets/images/share.png"}
                width={12}
                height={9}
                alt="shareIcon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSlider;
