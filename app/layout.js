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
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') document.documentElement.classList.add('dark');
                else if (theme === 'light') document.documentElement.classList.remove('dark');
                else if (window.matchMedia('(prefers-color-scheme: dark)').matches) document.documentElement.classList.add('dark');
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
