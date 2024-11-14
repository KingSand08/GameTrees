"use client";
import { ClassChange } from '@/types/ui/classChange';
import { signOut } from 'next-auth/react';
import React from 'react'

const SignOutButton = ({ className }: ClassChange) => {
    return (
        <button
            className={`flex-shrink-0 text-white bg-blue-600 hover:bg-blue-800 hover:text-slate-300 hover:ease-in NavButtonduration-100 rounded-lg py-2 px-3 ${className}`}
            onClick={() => signOut()}
        >
            SignOut
        </button>
    );
}

export default SignOutButton