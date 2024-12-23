"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { GiAncientColumns, GiChart, GiProgression } from "react-icons/gi";

export default function Navbar() {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  // Array containing navigation items
  const navItems = [
    {
      id: 1,
      icon: <GiChart className="text-xl" />,
      href: "/season",
      text: "Season",
    },
    {
      id: 2,
      icon: <GiAncientColumns className="text-xl" />,
      href: "/history",
      text: "History",
    },
    {
      id: 3,
      icon: <GiProgression className="text-2xl" />,
      href: "/stats",
      text: "Stats",
    },
  ];

  return (
    <div className="bg-stone-950 border-b-2 border-b-orange-950 flex justify-start items-start max-w-full mx-auto mb-2 text-stone-50 uppercase sans">
      {/* Logo */}
      <h1 className="text-3xl font-bold pl-4 p-1">
        <Link href="/" className="flex items-center gap-1">
          <Image src="/icon.png" alt="VPC Logo" width={30} height={30} />
          <span className="text-xl hover:text-orange-300">Virtual Pinball Chat</span>
        </Link>
      </h1>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex items-center px-4 ml-auto">
        {navItems.map((item) => (
          <li key={item.id}>
            <Link href={item.href}>
              <div className="flex items-center cursor-pointer duration-300 hover:text-orange-300 min-w-[max-content] p-2 gap-1">
                {item.icon}
                {item.text}
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className="block sm:hidden pr-4 pt-2 ml-auto">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? "fixed sm:hidden left-0 top-0 w-[80%] h-full border-r-2 border-r-orange-950 bg-stone-950 ease-in-out duration-500 z-50"
            : "ease-in-out w-[80%] duration-500 fixed top-0 bottom-0 left-[-100%]"
        }
      >
        {/* Mobile Logo */}
        <li key="Home">
          <h1 className="w-full uppercase text-3xl font-bold text-stone-50 pl-4 pt-1 pb-2">
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
              key={item.id}
              href={item.href}
              onClick={handleNav}
              className="flex w-full justify-center text-xl cursor-pointer duration-300 hover:text-orange-300"
            >
              <div className="flex px-5 py-2 items-center gap-x-1">
                {item.icon}
                {item.text}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
