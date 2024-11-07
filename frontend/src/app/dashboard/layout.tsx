import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { twMerge } from "tailwind-merge";
import DashboardWrapper from "../dashboardWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Medical Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div
        className={twMerge(inter.className, "bg-white text-black antialiased")}
      >
        <DashboardWrapper>{children}</DashboardWrapper>
      </div>
  );
}
