import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { twMerge } from "tailwind-merge";
import { ApolloWrapper } from "./ApolloWrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthcare System",
  description: "Healthcare management system",
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
        <ApolloWrapper>
          <Toaster position="top-right"
          reverseOrder={false}
          toastOptions={{
            success: {
              style: {
                background: '#4caf50',
                color: '#fff',
              },
              duration: 4000,
            },
            error: {
              style: {
                background: '#f44336',
                color: '#fff',
              },
              duration: 5000,
            },
          }}/>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
