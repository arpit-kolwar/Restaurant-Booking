"use client";
import Link from "next/link";
import React from "react";
import AuthModal from "./AuthModal";
import { useAppSelector } from "@/redux/store";
import useAuth from "@/hooks/useAuth";
export default function Navbar() {
  const { loading, error, data } = useAppSelector((state) => state.authReducer);
  const { logout } = useAuth();

  // Check if the user is logged in by verifying if 'data' contains necessary info
  const isLoggedIn = !!data && data.firstName;
  // console.log(isLoggedIn);

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        {" "}
        OpenTable{" "}
      </Link>
      <div>
        {loading ? null : isLoggedIn ? (
          <button className="bg-blue-400 text-white p-2" onClick={logout}>
            Logout
          </button>
        ) : (
          <div className="flex">
            <AuthModal isSignin={true} />
            <AuthModal isSignin={false} />
          </div>
        )}
      </div>
    </nav>
  );
}
