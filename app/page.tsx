import React from "react";
import Header from "./components/Header";
import Rehabilitation from "./components/Rehabilitation";
import Category from "./components/Category";
import Works from "./components/Works";
import Subscribe from "./components/Subscribe";
import Professional from "./components/Professional";

import MarketPlace from "./components/MarketPlace";
import { Footer } from "./components/Footer";
import Blog from "./components/Blog";
import Download from "./components/Download";
import Reviews from "./components/Reviews";

const Home = () => {
  return (
    <div className="w-full min-h-screen ">
      <Header />
      <div>
        <Rehabilitation />
        <Category />
        <Works />
        <Subscribe />
        <Professional />
        <Blog />
        <MarketPlace />
        <Subscribe />
        <Download />
        <Reviews />
        <Subscribe />
      </div>
    </div>
  );
};

export default Home;
