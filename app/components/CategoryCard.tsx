import Image, { StaticImageData } from "next/image";
import React from "react";

interface CategoryCardProps {
  src: StaticImageData;
  alt: string;
  text: string;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  src,
  alt,
  text,
  className = "",
}) => (
  <div
    className={`flex items-center gap-2.5 rounded-[10px] p-2 bg-gradient-to-br from-[rgba(94,43,143,0.4)] to-[rgba(61,51,74,0.3)] ${className}`}
  >
    <Image src={src} alt={alt} />
    <h3 className="text-white">{text}</h3>
  </div>
);

export default CategoryCard;
