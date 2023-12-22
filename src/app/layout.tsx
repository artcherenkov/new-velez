import { ReactNode } from "react";

interface IRootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
