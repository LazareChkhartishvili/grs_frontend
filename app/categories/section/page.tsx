"use client";
import React from "react";

import MobileNavbar from "../../components/Navbar/MobileNavbar";
import Header from "../../components/Header";
import Works from "../../components/Works";
import Subscribe from "../../components/Subscribe";
import ReviewSlider from "../../components/ReviewSlider";
import Blog from "../../components/Blog";
import Professional from "../../components/Professional";

const Section = () => {
  // testcomment
  return (
    <div>
      <MobileNavbar />
      <Header />
      <Works title={"test2"} items={[]} />
      <Works title={"test3"} items={[]} />
      <Subscribe />
      <ReviewSlider />
      <div className="md:my-10">
        <Blog withBanner={false} withSlider={true} />
      </div>
      <Professional />
    </div>
  );
};

export default Section;
