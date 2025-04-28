import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Why Not",
  description: "일정관리 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col items-center min-h-screen max-w-lg mx-auto bg-white">
        <main className="mx-auto max-w-md min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
