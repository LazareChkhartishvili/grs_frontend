import React from "react";
import CategoryCard from "./CategoryCard";
import book from "../../assets/images/book.svg";

const CategorySection: React.FC = () => (
  <div className="mt-[152px] mx-2">
    <div className="flex flex-col w-full">
      {/* ზედა ბარათი */}
      <CategoryCard src={book} alt="book" text="15 категорий" />

      {/* ქვედა ორი ბარათი */}
      <div className="flex flex-row w-full gap-1 mt-2">
        <CategoryCard
          src={book}
          alt="book"
          text="15 категорий"
          className="w-[177px]"
        />
        <CategoryCard
          src={book}
          alt="book"
          text="15 категорий"
          className="w-[177px]"
        />
      </div>
    </div>
  </div>
);

export default CategorySection;
