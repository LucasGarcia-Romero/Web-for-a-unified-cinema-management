import localFont from "next/font/local";
import "./globals.css";
import NavBar from './pages/navbar'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "CineFacil",
  description: "Compra tus entradas de cine de forma fácil y rápida",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
