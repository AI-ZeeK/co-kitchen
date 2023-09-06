import {Providers} from "@/redux/provider";
import "./globals.scss";
import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "Co Kitchen",
  description: "an assesment application",
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <Providers>
        <body>{children}</body>
      </Providers>
    </html>
  );
}
