import "./globals.css";

export const metadata = {
  title: "Shindos Backend",
  description: "Backend API and admin panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
