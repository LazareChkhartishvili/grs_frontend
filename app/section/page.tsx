import React from "react";

import MobileNavbar from "../components/Navbar/MobileNavbar";
import Header from "../components/Header";
import Works from "../components/Works";
import Subscribe from "../components/Subscribe";
import ReviewSlider from "../components/ReviewSlider";
import Blog from "../components/Blog";
import Professional from "../components/Professional";

const Section = () => {
  return (
    <div>
      <MobileNavbar />
      <Header />
      <Works />
      <Works />
      <Subscribe />
      <ReviewSlider />
      <Blog withBanner={false} />
      <Professional />
    </div>
  );
};

export default Section;
