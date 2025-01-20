import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const font = Space_Grotesk({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons:{
    icon: "/images/LOGO.png",
    apple: "/images/LOGO.png"

  },
  title: "JDN Tuition",
  description: "Australia's Best Tutoring Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
