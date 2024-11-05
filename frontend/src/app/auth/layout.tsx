import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Registration",
  description: "Register for AIMEDICALS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={twMerge(inter.className, "bg-white text-black antialiased")}
      >
        {children}
      </body>
    </html>
  );
}
