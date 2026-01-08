import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import MainLayout from "@/components/layout/MainLayout";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anil Das P. - Portfolio",
  description: "Portfolio of Anil Das P., a Computer Science Engineer specializing in Flutter & Full-Stack Web Development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>
          {children}
        </MainLayout>
        <Toaster />
      </body>
    </html>
  );
}
