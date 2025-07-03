"use client";
import { usePathname } from "next/navigation";
import { CategoryProvider } from "../context/CategoryContext";
import { Footer } from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter =
    pathname.startsWith("/auth/signIn") ||
    pathname.startsWith("/auth/register");

  return (
    <CategoryProvider>
      {children}
      {!hideFooter && <Footer />}
    </CategoryProvider>
  );
}
