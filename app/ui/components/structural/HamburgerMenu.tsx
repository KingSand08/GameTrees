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
            <div tabIndex={0} role="button" className="btn btn-ghost mx-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-8 w-8 stroke-white" //change stroke-white to stroke-current to auto adapt based on theme setting once custom theme is in place
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
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-48 p-3 shadow">
                {session && session.user ? (
                    <>
                        <li><SignOutButton className='block text-center px-3 py-2' /></li>
                        <hr className='opacity-25 my-2 border-white' />
                    </>
                ) : (
                    <>
                        <li><LoginButton className='block text-center' /></li>
                        <hr className='opacity-25 my-2 border-white' />
                        <li><SignUpButton className='block text-center' /></li>
                        <hr className='opacity-25 my-2 border-white' />
                    </>
                )}
                <li><NavButton page="Home" route="/" className='block text-center' /></li>
                <hr className='opacity-25 my-2 border-white' />
                <li><NavButton page="Games" route="/temp/all-games" className='block text-center' /></li>
                <hr className='opacity-25 my-2 border-white' />
                {session && (
                    <>
                        <li><NavButton page="Account Settings" route="/account-settings" className='block text-center' /></li>
                        <hr className='opacity-25 my-2 border-white' />
                    </>
                )}
                {session?.user.role === "customer" && (
                    <>
                        <li><NavButton page="WishList" route={`/users/${session?.user.username}/wishlist`} className='block text-center' /></li>
                        <hr className='opacity-25 my-2 border-white' />
                    </>
                )}
                {session?.user.role === "admin" && (
                    <>
                        <li><NavButton page="Admin User View" route="/admin/user-view" className='block text-center' /></li>
                        <hr className='opacity-25 my-2 border-white' />
                        <li><NavButton page="Add New Custom Game" route="/admin/add-game" className='block text-center' /></li>
                    </>
                )}
            </ul>
        </div >

    );
}
