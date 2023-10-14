import Navigation from "@/components/Navigation";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OMI Q. Roo",
  description: "Olimpiada Mexicana de Informática - Quintana Roo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="w-max-screen-md flex flex-col items-center bg-slate-100 min-h-[calc(100vh-140px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
