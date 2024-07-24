"use client";

import { Button } from "@/@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/@/components/ui/dropdown-menu";
import Link from "next/link";

function Header() {
  const { data } = useSession();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className="p-5 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Image src="./logo.svg" alt="" width={150} height={75} />
        <div className="md:flex items-center gap-6 hidden">
          <Link
            href={"/"}
            className="hover:scale-105 hover:text-primary cursor-pointer"
          >
            Home
          </Link>
          <Link href={"/search/Cleaning"} className="hover:scale-105 hover:text-primary cursor-pointer">
            Services
          </Link>
          <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
            Contact Us
          </h2>
        </div>
      </div>
      <div>
        {data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={data?.user?.image}
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 shadow-lg bg-white rounded-md w-32 cursor-pointer">
              <DropdownMenuLabel className="font-bold text-gray-700 mb-0.5">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition">
                <Link href={"/myBooking"}>My Bookings </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => signOut()}
                className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded-md transition"
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className="rounded-sm h-8 p-1.5 text-white"
            onClick={() => signIn("descope")}
          >
            Login / Sign Up
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
