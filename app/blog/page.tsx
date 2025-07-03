"use client";

import Header, { defaultMenuItems } from "../components/Header";

import Blog from "../components/Blog";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";

const BlogRoute = () => {
  return (
    <div>
      <DesktopNavbar menuItems={defaultMenuItems} blogBg={true} />
      <MobileNavbar />
      <Header variant="blog" />
      <div className="flex flex-col gap-20">
        <Blog withBanner={false} withSlider={false} layoutType="default" />
        <Blog withBanner={false} withSlider={false} layoutType="other" />
        <Blog withBanner={false} withSlider={false} layoutType="default" />
        <Blog withBanner={false} withSlider={false} layoutType="thirdGrid" />
      </div>
    </div>
  );
};

export default BlogRoute;
