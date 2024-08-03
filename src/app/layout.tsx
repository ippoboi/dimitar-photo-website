import { GeistMono } from "geist/font/mono";
import type { Metadata } from "next";

import NavigationBarComponent from "../../components/navigationBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dimitar Gallery",
  description: "My photo gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>
        {/* <NavigationBarComponent /> */}
        {children}
      </body>
    </html>
  );
}
