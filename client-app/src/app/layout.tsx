import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Gym Xpert",
  description: "A app for managing your Gym",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={`${outfit.variable}`}>
        {children}
      </body>
    </html>
  );
}
