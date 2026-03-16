import TopBar from "@/components/nav/TopBar";
import { ThemeProvider } from "@/lib/ThemeContext";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.METADATA_URL),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const t = localStorage.getItem('theme');
                if (t === 'dark') document.documentElement.classList.add('dark');
              })();
            `,
          }}
        />
      </head>
      <body className="bg-stone-100 dark:bg-stone-950">
        <ThemeProvider>
          <TopBar />
          <div className="flex flex-wrap w-full px-2">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
