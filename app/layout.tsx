import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import LayoutWrapper from "@/components/layout-wrapper";

// Optimize font loading
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Add font-display swap for faster text rendering
});

export const metadata = {
  title: "Local Eco Solve",
  description: "A platform for reporting and tracking local environmental issues",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
