import React from "react";
import TeacherInfo from "../components/TeacherInfo";
import DesktopNavbar from "../components/Navbar/DesktopNavbar";
import MobileNavbar from "../components/Navbar/MobileNavbar";
import { defaultMenuItems } from "../components/Header";

const Teachers = () => {
  return (
    <div>
      <DesktopNavbar menuItems={defaultMenuItems} blogBg={false} />
      <MobileNavbar />
      <div>
        <TeacherInfo />
      </div>
    </div>
  );
};

export default Teachers;
