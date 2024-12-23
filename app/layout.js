import TopBar from "@/components/nav/TopBar";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(`${process.env.VPC_BASE_URL}`),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-stone-950">
        <TopBar />
        {children}
      </body>
    </html>
  );
};
