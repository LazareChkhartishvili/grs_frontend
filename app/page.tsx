import React from "react";
import Header from "./components/Header";
import Rehabilitation from "./components/Rehabilitation";
import Category from "./components/Category";
import Works from "./components/Works";
import Subscribe from "./components/Subscribe";
import Professional from "./components/Professional";

const Home = () => {
  return (
    <div className="w-full min-h-screen ">
      <Header />
      <div className="bg-[#F9F7FE]">
        <Rehabilitation />
        <Category />
        <Works />
        <Subscribe />
        <Professional />
      </div>
    </div>
  );
};

export default Home;
