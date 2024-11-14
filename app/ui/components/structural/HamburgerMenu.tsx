"use client";

import React, { useState } from 'react';
import HamburgerIcon from "@/app/ui/svg/Hamburger";
import DropdownMenu from "@/app/ui/components/structural/DropdownMenu";

export default function HamburgerMenu() {
    const [open, setOpen] = useState(false);

    function handleBurgerClick() {
        setOpen(prevOpen => !prevOpen);
    }

    function handleCloseDropdown() {
        setOpen(false);
    }

    return (
        <div className='ml-12 mr-8'>
            <button
                className='cursor-pointer'
                onClick={handleBurgerClick}
            >
                <HamburgerIcon className="w-10" />
            </button>

            {/* Dropdown Menu */}
            <DropdownMenu open={open} onClose={handleCloseDropdown} />
        </div>
    );
}