import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog (or some such thing)",
  description: "This is a blog (or some such thing) with a comments form",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <nav>
        <Link href="/">HOME</Link> | <Link href="/about">ABOUT</Link> | <Link href="/posts">POSTS</Link> | <Link href="/posts/new">CREATE POST</Link>
      </nav>
      <header>Myles' Page</header>
        {children}
      <footer>&copy; Myles 2024 How're ya&#8482;</footer>
        </body>
    </html>
  );
}
