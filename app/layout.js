import TopBar from "@/components/nav/TopBar";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://virtualpinballchat.com"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-stone-950">
        <TopBar />
        <div className="flex flex-wrap w-full px-2">{children}</div>
      </body>
    </html>
  );
}
