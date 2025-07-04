import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/context/ui-context";
import Shell from "@/components/Shell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ERP Pro - Business Management System",
  description: "Modern ERP system for managing customers, jobs, invoices, and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <UIProvider>
          <Shell>
            {children}
          </Shell>
        </UIProvider>
      </body>
    </html>
  );
}