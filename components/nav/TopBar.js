"use client";

import ThemeToggle from "@/components/nav/ThemeToggle";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import {
  GiPinballFlipper,
  GiChart,
  GiHighFive,
  GiProgression,
} from "react-icons/gi";

export default function Navbar() {
  const [nav, setNav] = useState(false);
  const menuRef = useRef(null);

  const handleNav = () => setNav(!nav);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (nav && menuRef.current && !menuRef.current.contains(e.target)) {
        setNav(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [nav]);

  const navItems = [
    {
      id: 1,
      icon: <GiPinballFlipper className="text-xl" />,
      href: "/competitions",
      text: "Competition Corner",
    },
    {
      id: 2,
      icon: <GiHighFive className="text-2xl" />,
      href: "/highscores",
      text: "High Score Corner",
    },
    {
      id: 3,
      icon: <GiProgression className="text-xl" />,
      href: "/stats",
      text: "League Statistics",
    },
    {
      id: 4,
      icon: <GiChart className="text-xl" />,
      href: "/season",
      text: "Season Leaderboard",
    },
    {
      id: 5,
      icon: <AiOutlineQuestionCircle className="text-xl" />,
      href: "/faqs",
      text: "How to Join",
    },
  ];

  return (
    <div className="bg-stone-100 dark:bg-stone-950 border-b-2 border-b-orange-500 dark:border-b-orange-950 flex justify-start items-start max-w-full mx-auto text-stone-800 dark:text-stone-200 sans">
      {/* Logo */}
      <h1 className="text-3xl pl-4 p-1">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/icon.png" alt="VPC Logo" width={30} height={30} />
          <span className="text-xl hover:text-orange-600 dark:hover:text-orange-300">
            Virtual Pinball Chat
          </span>
        </Link>
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden lg:flex items-center px-4 ml-auto">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>
              <div className="flex flex-row items-center cursor-pointer duration-300 hover:text-orange-600 dark:hover:text-orange-300 p-2 gap-1 text-xs xl:text-base">
                {item.icon}
                {item.text}
              </div>
            </Link>
          </li>
        ))}
        <li>
          <ThemeToggle />
        </li>
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block lg:hidden pr-4 pt-2 ml-auto">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        ref={menuRef}
        className={
          nav
            ? "fixed lg:hidden left-0 top-0 w-[80%] h-full border-r-2 border-r-orange-500 dark:border-r-orange-950 bg-stone-100 dark:bg-stone-950 ease-in-out duration-500 z-50"
            : "fixed top-0 left-[-100%] w-[80%] h-full border-r-2 border-r-orange-500 dark:border-r-orange-950 bg-stone-100 dark:bg-stone-950 ease-in-out duration-500 z-50"
        }
      >
        {/* Mobile Logo */}
        <li key="Home">
          <h1 className="w-full text-3xl text-stone-800 dark:text-stone-200 pl-4 pt-1 pb-2">
            <Link
              href="/"
              onClick={handleNav}
              className="flex items-center gap-1"
            >
              <Image
                src="/icon.png"
                alt="Virtual Pinball Chat Logo"
                width={30}
                height={30}
              />
              <span className="text-xl">Virtual Pinball Chat</span>
            </Link>
          </h1>
        </li>

        {/* Mobile Navigation Items */}
        {navItems.map((item) => (
          <li key={item.id} className="flex w-full justify-center">
            <Link
              href={item.href}
              onClick={handleNav}
              className="flex w-full justify-center text-xl cursor-pointer duration-300 hover:text-orange-600 dark:hover:text-orange-300"
            >
              <div className="flex px-5 py-2 items-center gap-x-1">
                {item.icon}
                {item.text}
              </div>
            </Link>
          </li>
        ))}
        <li key="ThemeToggle" className="flex w-full justify-center mt-2">
          <ThemeToggle />
        </li>
      </ul>
    </div>
  );
}
