"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LogoIcon from "@/public/icons/ours/GameTreesLogo.png";
import Hamburger from "@/app/ui/svg/Hamburger";
import Image from 'next/image';
import { useSession } from "next-auth/react";
import ProfileButton from './session/ProfileButton';
import SignOutButton from './session/SignOutButton';
import LoginButton from './session/LoginButton';
import SignUpButton from './session/SignUpButton';
import NavButton from './structural/NavButton';


export default function Navbar() {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get session status and user info
    const { data: session } = useSession();

    function handleBurgerClick() {
        setOpen(prevOpen => !prevOpen);
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <header className='bg-slate-800 py-4 px-4 sm:px-8 top-0 left-0 w-full z-50 mb-8'>
                <div className='flex items-center justify-between h-20 mx-auto'>
                    {/* Logo */}
                    <div className='flex items-center flex-grow'>
                        <Link href='/'>
                            <Image
                                src={LogoIcon}
                                alt="Game Trees Logo"
                                quality={100}
                                className="object-contain"
                                style={{
                                    width: '5em',  // Width in em
                                    height: '5em', // Height in em
                                    flexShrink: 0,
                                    flexGrow: 0,
                                }}
                            />
                        </Link>
                    </div>

                    {/* Regular Navbar Links (Visible on larger screens) */}
                    <div className='flex ml-4 items-center space-x-8 text-[1.3em] font-semibold font-inter'>
                        <NavButton page="Home" route="/" className='hover:font-bold xl:block lg:block md:hidden sm:hidden min-[380px]:hidden' />
                        <NavButton page="Wishlist" route={`/user/${session?.user.id}/wishlist`} className='flex-shrink-0 lg:block md:block sm:hidden min-[380px]:hidden' />
                        <NavButton page="Account Settings" route="/account-settings" className='flex-shrink-0 xl:block lg:hidden md:hidden sm:hidden min-[380px]:hidden' />
                        <NavButton page="Database Accessor" route="/CURDMySQL" className='flex-shrink-0 2xl:block xl:hidden lg:hidden md:hidden sm:hidden min-[380px]:hidden' />
                        {/* {showButtons && (
                            <>

                            </>
                        )} */}

                        {/* Conditional Rendering based on session */}
                        {session && session.user ? (
                            <>
                                <Link href={"/account-settings"} className='cursor-pointer'>
                                    <ProfileButton
                                        className='w-full xl:flex lg:flex md:flex sm:hidden min-[380px]:hidden'
                                        imgClassName='w-[2.8rem] h-[2.8rem]'
                                        username={session.user.username}
                                        name={session.user.name}
                                        image={session.user.image ?? undefined}
                                    />
                                </Link>
                                <SignOutButton className='flex-shrink-0 block xl:block lg:block md:hidden sm:hidden min-[380px]:hidden' />
                            </>
                        ) : (
                            <>
                                <LoginButton className='flex-shrink-0' />
                                <SignUpButton className='flex-shrink-0' />
                            </>
                        )}
                    </div>

                    {/* Hamburger Menu Button (Visible on all screen sizes) */}
                    <div className='ml-12 mr-8'>
                        <button
                            className='cursor-pointer'
                            onClick={handleBurgerClick}
                        >
                            <Hamburger className="w-10" />
                        </button>
                    </div>
                </div >

                {/* Dropdown Menu */}
                {open && (
                    <div className='w-fit pt-16 fixed z-50 top-[2em] lg:right-5 right-1'>
                        <div ref={dropdownRef} className='w-fit bg-nav-background px-8 p-1 outline outline-2 outline-offset-1 outline-white rounded-lg bg-black bg-opacity-55'>
                            <hr className='mt-4' />
                            <div className='flex flex-col w-fit py-4 space-y-3 items-center text-[1.08em] font-semibold font-inter text-center'>
                                {session && session.user ? (
                                    <>
                                        {/* Profile and SignOut on the same line */}
                                        {/* <div className="bg-black bg-opacity-40 flex justify-between items-center px-5 py-3 rounded-lg text-white hover:text-purple-300 hover:bg-opacity-85 cursor-pointer">

                                        </div> */}
                                        <ProfileButton
                                            className='w-full block md:hidden'
                                            imgClassName='w-[2.8rem] h-[2.8rem]'
                                            username={session.user.username}
                                            name={session.user.name}
                                            image={session.user.image ?? undefined}
                                        />

                                        <SignOutButton className='w-full block lg:hidden' />
                                    </>
                                ) : (
                                    <>
                                        <LoginButton className='w-full block sm:hidden' />
                                        <SignUpButton className='w-full block sm:hidden' />
                                    </>
                                )}
                                <NavButton page="Home" route="/" className='block w-full' />
                                <NavButton page="Database Accessor" route="/CURDMySQL" className='block mt-1.5 w-full' />
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}