"use client";
import { ClassChange } from '@/types/ui/classChange';
import { signOut } from 'next-auth/react';
import React from 'react'

const SignOutButton = ({ className }: ClassChange) => {
    return (
        <button
            className={`flex-shrink-0 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition ${className}`}
            onClick={() => signOut()}
        >
            Sign Out
        </button>
    );
}

export default SignOutButton