import type { Metadata } from "next";
import "../styles/custom.css";

export const metadata: Metadata = {
  title: "SynOEM Dashboard",
  description: "SynOEM Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  );
}
