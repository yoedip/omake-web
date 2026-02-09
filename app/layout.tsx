import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omake",
  description:
    "Gift with purchases done right. It was never about the monetary value — it was about the gesture, the human connection, the delight of getting something unexpected.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistMono.variable} bg-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
