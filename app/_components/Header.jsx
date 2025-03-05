"use client";

import { useEffect } from "react";
import { useDescope } from "@descope/react-sdk"; // Import from React SDK
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import Link from "next/link";

function Header() {
  const { user, logout } = useDescope(); // Ensure this is inside <AuthProvider />
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      console.log("User is not logged in");
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.replace("/"); // Redirect to home after logout
  };

  return (
    <div className="p-5 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-8">
        <Image src="/logo.svg" alt="Logo" width={150} height={75} />
        <div className="md:flex items-center gap-6 hidden">
          <Link href="/" className="hover:scale-105 hover:text-primary">
            Home
          </Link>
          <Link
            href="/search/Cleaning"
            className="hover:scale-105 hover:text-primary"
          >
            Services
          </Link>
          <Link href="/contact" className="hover:scale-105 hover:text-primary">
            Contact Us
          </Link>
        </div>
      </div>
      <div>
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image
                src={user?.picture || "/default-avatar.png"}
                alt="User"
                width={40}
                height={40}
                className="rounded-full cursor-pointer"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2 shadow-lg bg-white rounded-md w-32">
              <DropdownMenuLabel className="font-bold text-gray-700 mb-0.5">
                {user?.name || "My Account"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="hover:bg-gray-100 p-2 rounded-md transition">
                <Link href="/myBooking">My Bookings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleLogout}
                className="hover:bg-gray-100 p-2 rounded-md transition"
              >
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            className="rounded-sm h-8 p-1.5 text-white"
            onClick={() => router.push("/login")}
          >
            Login / Sign Up
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
