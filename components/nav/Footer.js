"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-2 px-4 border-t border-stone-300 dark:border-stone-800 text-stone-600 dark:text-stone-400 sans">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-1 text-sm">
          <Link href="/tos" className="hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-200">
            Terms of Service
          </Link>
          <Link href="/privacy-policy" className="hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-200">
            Privacy Policy
          </Link>
        </div>
        <div className="text-xs opacity-70">
          © {new Date().getFullYear()} Virtual Pinball Chat
        </div>
      </div>
    </footer>
  );
}
