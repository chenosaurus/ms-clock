import "./globals.css";

export const metadata = {
  title: "MS Clock",
  description: "Large millisecond precision clock",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


