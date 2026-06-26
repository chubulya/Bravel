import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bravel | Speak with confidence",
  description: "A warmer way to practise real English conversations."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
