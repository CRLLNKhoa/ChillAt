import { Playpen_Sans } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/session-provider";
import { Toaster } from "@/components/ui/toaster";

const playpen = Playpen_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Chill At",
  description: "Coded by Lương Khoa",
};

export default function RootLayout({ children }) {
  return (
    <html
      suppressHydrationWarning={true}
      lang="en"
    >
      <body className={playpen.className}>{children}
      <SessionProvider />
      <Toaster />
      </body>
    </html>
  );
}
