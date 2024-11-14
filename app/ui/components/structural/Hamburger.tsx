"use client";

import React, { useEffect, useRef, useState } from "react";
import ProfileButton from "../session/ProfileButton";
import { useSession } from "next-auth/react";
import NavButton from "./NavButton";
import SignUpButton from "../session/SignUpButton";
import LoginButton from "../session/LoginButton";
import SignOutButton from "./NavButton";


const Hamburger = () => {
    const { data: session } = useSession();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);

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

    function handleBurgerClick() {
        setOpen(prevOpen => !prevOpen);
    }

    return (
        <>{/* Dropdown Menu */}
            {
                open && (
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
                )
            }
        </>
    );
}

export default Hamburger;