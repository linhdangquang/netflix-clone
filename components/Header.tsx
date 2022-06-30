/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/solid";
import Link from "next/link";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handlerScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handlerScroll);

    return () => {
      window.removeEventListener("scroll", handlerScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://res.cloudinary.com/linh-asm/image/upload/v1654265063/netflix/Netflix_2015_logo_qyy4ox.svg"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchIcon className="hidden h-6 w-6 sm:inline" />
        <div className="hidden lg:inline">Kids</div>
        <BellIcon className="h-6 w-6" /> 
        {/* <Link href={"account"}> */}
        <img
          onClick={() => logout()}
          src="https://res.cloudinary.com/linh-asm/image/upload/v1654272771/netflix/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo_ccdvsr.png"
          alt=""
          className="cursor-pointer rounded"
        />
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;
