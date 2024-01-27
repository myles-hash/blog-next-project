import "./globals.css";
import Link from "next/link";


export const metadata = {
  title: "Post Page ",
  description: "This is a post page made by me, Myles",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="body">
      <header>Myles Post Page</header>
      <nav className="nav">
        <Link className="link" href="/">HOME</Link> | <Link className="link" href="/about">ABOUT</Link> | <Link className="link" href="/posts">POSTS</Link> | <Link className="link" href="/posts/new">CREATE POST</Link>
      </nav>
      <div>
        {children}
        </div>
      <footer>&copy; Myles 2024 Howre ya&#8482;</footer>
        </body>
    </html>
  );
}
