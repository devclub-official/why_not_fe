import type { Metadata } from "next";

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
      <body>
        {children}
      </body>
    </html>
  );
}
