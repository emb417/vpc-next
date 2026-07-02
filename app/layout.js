import TopBar from "@/components/nav/TopBar";
import Footer from "@/components/nav/Footer";
import { ThemeProvider } from "@/lib/ThemeContext";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(process.env.METADATA_URL),
  openGraph: {
    siteName: "Virtual Pinball Chat",
    type: "website",
  },
  twitter: {
    card: "summary",
  },
};

export const viewport = {
  themeColor: "#ea580c",
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
      <body className="bg-stone-100 dark:bg-stone-950 h-dvh flex flex-col overflow-hidden">
        <ThemeProvider>
          <TopBar />
          <div className="flex flex-wrap w-full px-2 flex-grow min-h-0 overflow-y-auto">
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
