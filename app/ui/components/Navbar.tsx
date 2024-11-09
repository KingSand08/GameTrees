"use client";
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LogoIcon from "@/public/icons/ours/GameTreesLogo.png";
import Hamburger from "@/app/ui/svg/Hamburger";
import Image from 'next/image';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [showButtons, setShowButtons] = useState(true);
    const dropdownRef = useRef<HTMLDivElement>(null);

    function handleBurgerClick() {
        setOpen(prevOpen => !prevOpen);
    }

    // Hook to check screen size and toggle navbar buttons
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setShowButtons(width >= 2000); // Show buttons if width is >= 875px
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
                            <Image src={LogoIcon} alt="Game Trees Logo" quality={100} className="w-[5em] h-auto" />
                        </Link>
                    </div>

                    {/* Regular Navbar Links (Visible on larger screens) */}
                    <div className={`hidden md:flex ml-4 items-center space-x-8 text-[1.3em] font-semibold font-inter`}>
                        <PageButton page="Home" route="/" className='hover:font-bold' />
                        <PageButton page="Account Settings" route="/account-settings" className='flex-shrink-0 lg:block sm:hidden' />
                        <PageButton page="Wishlist" route="/wishlist" className='flex-shrink-0 lg:block md:hidden sm:hidden' />
                        {showButtons && (
                            <>
                                <PageButton page="Database Accessor" route="/CURDMySQL" className='flex-shrink-0' />
                            </>
                        )}
                        <SessionButton status="Sign in" route="/api/auth/signin" className='flex-shrink-0' />
                        <SessionButton status="Sign up" route="/signup" className='flex-shrink-0' />
                        <SessionButton status="Sign out" route="/api/auth/signout" className='flex-shrink-0' />
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
                        <div ref={dropdownRef} className='w-fit bg-nav-background px-8 p-1 outline outline-2 outline-offset-1 outline-white rounded-lg'>
                            <hr className='mt-4' />
                            <div className='py-4 items-center text-[1.08em] font-semibold font-inter text-center'>
                                <SessionButton status="Sign in" route="/login" className='mt-1.5 w-full block sm:hidden' />
                                <SessionButton status="Sign up" route="/signup" className='mt-1.5 w-full block sm:hidden' />
                                <PageButton page="Home" route="/" className='block w-full' />
                                <PageButton page="Database Accessor" route="/CURDMySQL" className='block mt-1.5 w-full' />
                                <PageButton page="Server Load Test" route="/serverRenderTest" className='block mt-1.5 w-full' />
                                <PageButton page="Client Load Test" route="/clientRenderTest" className='block mt-1.5 w-full' />
                                <PageButton page="Route Test" route="/sendInfoTest" className='block mt-1.5 w-full' />
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
    status: string;
    route: string;
    className: string;
}
function SessionButton({ status, route, className }: SessionButtonProps) {
    return (
        <Link
            className={`flex-shrink-0 text-white bg-blue-600 hover:bg-blue-800 hover:text-slate-300 hover:ease-in hover:font-bold duration-100 rounded-lg py-2 px-3 ${className}`}
            href={route}
        >
            {status}
        </Link>
    );
}
