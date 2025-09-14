import "./styles/global.css";
import React from "react";

export const metadata = {
  title: "Recipe Collection",
  description: "Browse and favorite recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-4xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
