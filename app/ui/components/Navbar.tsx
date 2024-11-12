"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LogoIcon from "@/public/icons/ours/GameTreesLogo.png";
import Hamburger from "@/app/ui/svg/Hamburger";
import Image from 'next/image';
import { useSession, signOut } from "next-auth/react";
import { usePathname } from 'next/navigation';


export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Get session status and user info
    const { data: session } = useSession();

    function handleBurgerClick() {
        setOpen(prevOpen => !prevOpen);
    }

    // Hook to check screen size and toggle navbar buttons
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setShowButtons(width >= 2000); // Show buttons if width is >= 2000px
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    <div className={`hidden md:flex ml-4 items-center space-x-8 text-[1.3em] font-semibold font-inter`}>
                        <PageButton page="Home" route="/" className='hover:font-bold' />
                        <PageButton page="Account Settings" route="/account-settings" className='flex-shrink-0 lg:block sm:hidden' />
                        <PageButton page="Wishlist" route={`/user/${session?.user.id}/wishlist`} className='flex-shrink-0 lg:block md:hidden sm:hidden' />
                        {showButtons && (
                            <>
                                <PageButton page="Database Accessor" route="/CURDMySQL" className='flex-shrink-0' />
                            </>
                        )}

                        {/* Conditional Rendering based on session */}
                        {session && session.user ? (
                            <>
                                <Link href={"/account-settings"} className='cursor-pointer'>
                                    <div
                                        className="flex items-center gap-3 bg-black bg-opacity-35 rounded-lg px-4 py-[0.45em]"
                                    >
                                        <Image
                                            src={session.user.image || "/default/defaultProfilePhoto.png"}
                                            alt="Profile"
                                            quality={100}
                                            width={100}
                                            height={100}
                                            className="w-[3em] h-[3em] rounded-full"
                                        />
                                        <span className="text-white">{session.user.username || session.user.name}</span>
                                    </div>
                                </Link>
                                <SignOutButton className='flex-shrink-0' />
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
                            <div className='py-4 items-center text-[1.08em] font-semibold font-inter text-center'>
                                {session && session.user ? (
                                    <>
                                        <div className="bg-black bg-opacity-40 flex space-x-4 items-center mr-7 px-5 py-3 rounded-lg text-white hover:text-purple-300 hover:bg-opacity-85 cursor-pointer">
                                            <Image
                                                src={session.user.image || "/default/defaultProfilePhoto.png"}
                                                alt="User Avatar"
                                                width={100}
                                                height={100}

                                                className="w-4 h-4 md:w-[2.8rem] md:h-[2.8rem] lg:w-[2.8rem] lg:h-[2.8rem] rounded-full"
                                            />
                                            <SignOutButton className='block w-full' />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <LoginButton className='mt-1.5 w-full block sm:hidden' />
                                        <SignUpButton className='mt-1.5 w-full block sm:hidden' />
                                    </>
                                )}
                                <PageButton page="Home" route="/" className='block w-full' />
                                <PageButton page="Database Accessor" route="/CURDMySQL" className='block mt-1.5 w-full' />
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}

interface PageButtonProps {
    page: string;
    route: string;
    className: string;
}
function PageButton({ page, route, className }: PageButtonProps) {
    return (
        <Link
            className={`flex-shrink-0 text-white hover:bg-white hover:text-slate-800 hover:ease-in hover:font-bold duration-100 rounded-lg py-2 px-3 ${className}`}
            href={route}
        >
            {page}
        </Link>
    );
}

interface SessionButtonProps {
    className: string;
}
function LoginButton({ className }: { className: string }) {
    const pathname = usePathname(); // Get the current path

    return (
        <Link
            className={`flex-shrink-0 text-white bg-blue-600 hover:bg-blue-800 hover:text-slate-300 hover:ease-in hover:font-bold duration-100 rounded-lg py-2 px-3 ${className}`}
            href={`/login?callbackUrl=${encodeURIComponent(pathname)}`} // Use pathname for the callback URL
        >
            Sign In
        </Link>
    );
}

function SignOutButton({ className }: SessionButtonProps) {
    return (
        <button
            className={`flex-shrink-0 text-white bg-blue-600 hover:bg-blue-800 hover:text-slate-300 hover:ease-in hover:font-bold duration-100 rounded-lg py-2 px-3 ${className}`}
            onClick={() => signOut()} // Call onClick if provided (for sign out)
        >
            SignOut
        </button>
    );
}

function SignUpButton({ className }: SessionButtonProps) {
    const pathname = usePathname(); // Get the current path

    return (
        <Link
            className={`flex-shrink-0 text-white bg-blue-600 hover:bg-blue-800 hover:text-slate-300 hover:ease-in hover:font-bold duration-100 rounded-lg py-2 px-3 ${className}`}
            href={`/signup?callbackUrl=${encodeURIComponent(pathname)}`} // Use pathname for the callback URL
        >
            Sign Up
        </Link>
    )
}