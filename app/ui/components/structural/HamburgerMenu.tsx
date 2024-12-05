"use client";

import { useSession } from "next-auth/react";
import React from "react";
import NavButton from "@/app/ui/components/buttons/NavButton";
import SignUpButton from "@/app/ui/components/auth/SignUpButton";
import LoginButton from "@/app/ui/components/auth/LoginButton";
import SignOutButton from "@/app/ui/components/auth/SignOutButton";

export default function HamburgerMenu() {
    const { data: session } = useSession();

    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost mx-5"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-current"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                </svg>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-slate-300 dark:bg-[#192035] text-base-content rounded-box z-[1] mt-3 w-64 p-3 shadow"
            >
                {session && session.user ? (
                    <>
                        <li>
                            <SignOutButton className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                    </>
                ) : (
                    <>
                        <li>
                            <LoginButton className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                        <li>
                            <SignUpButton className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                    </>
                )}
                <li>
                    <NavButton page="Games" route="/temp/all-games" className="btn btn-ghost w-full text-center text-[1em]" />
                </li>
                <hr className="opacity-25 my-2 border-base-content" />
                {session && (
                    <>
                        <li>
                            <NavButton page="Account Settings" route="/account-settings" className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                    </>
                )}
                {session?.user.role === "customer" && (
                    <>
                        <li>
                            <NavButton page="WishList" route={`/users/${session?.user.username}/wishlist`} className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                    </>
                )}
                {session?.user.role === "admin" && (
                    <>
                        <li>
                            <NavButton page="Admin User View" route="/admin/user-view" className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                        <li>
                            <NavButton page="Admin: Add New Game" route="/admin/add-game" className="btn btn-ghost w-full text-center text-[1em]" />
                        </li>
                        <hr className="opacity-25 my-2 border-base-content" />
                    </>
                )}
            </ul>
        </div>
    );
}
