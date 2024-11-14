"use client";

import React, { useEffect, useRef } from 'react';
import { useSession } from "next-auth/react";
import NavButton from "@/app/ui/components/auth/NavButton";
import SignUpButton from "@/app/ui/components/auth/SignUpButton";
import LoginButton from "@/app/ui/components/auth/LoginButton";
import SignOutButton from "@/app/ui/components/auth/SignOutButton";
interface DropdownMenuProps {
    open: boolean;
    onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ open, onClose }) => {
    const { data: session } = useSession();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!open) return null;

    return (
        <div className='w-fit pt-16 fixed z-50 top-[2em] right-1 right]'>
            <div ref={dropdownRef} className='w-fit bg-nav-background px-8 p-1 outline outline-2 outline-offset-1 outline-white rounded-lg bg-black bg-opacity-55' >
                <div className='flex flex-col font-semibold w-[10em] py-4 space-y-3 items-center text-[1.08em] font-inter text-center'>
                    {session && session.user ? (
                        <>
                            <SignOutButton className='w-full block lg:hidden' />
                        </>
                    ) : (
                        <>
                            <LoginButton className='w-full block sm:hidden' />
                            <SignUpButton className='w-full block sm:hidden' />
                        </>
                    )}
                    <NavButton page="Home" route="/" className='block w-full' />
                    <hr className='w-3/4 opacity-25 border-white' />
                    <NavButton page="WishList" route={`/user/${session?.user.id}/wishlist`} className='block w-full' />
                    <hr className='w-3/4 opacity-25 border-white' />
                    <NavButton page="Account Settings" route="/account-settings" className='block w-full' />
                    <hr className='w-3/4 opacity-25 border-white' />
                    <NavButton page="Database Accessor" route="/CURDMySQL" className='block mt-1.5 w-full' />
                </div>
            </div>
        </div >
    );
};

export default DropdownMenu;