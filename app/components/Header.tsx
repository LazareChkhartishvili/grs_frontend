import React from "react";
import MobileNavbar from "./MobileNavbar";
import DesktopNavbar from "./DesktopNavbar";
import CategorySection from "./CategortSection";

interface MenuItem {
  id: number;
  name: string;
}

interface HeaderProps {
  menuItems?: MenuItem[];
}

const defaultMenuItems: MenuItem[] = [
  { id: 1, name: "Все комплексы" },
  { id: 2, name: "О нас" },
  { id: 3, name: "Блог" },
  { id: 4, name: "Контакты" },
];

const Header: React.FC<HeaderProps> = ({ menuItems = defaultMenuItems }) => (
  <>
    <MobileNavbar />
    <DesktopNavbar menuItems={menuItems} />
    <CategorySection />
  </>
);

export default Header;
