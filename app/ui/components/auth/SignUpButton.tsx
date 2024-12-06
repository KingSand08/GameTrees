"use client";
import { ClassChange } from '@/types/ui/classChange';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const SignUpButton = ({ className }: ClassChange) => {
    const pathname = usePathname();

    return (
        <Link
            className={`flex-shrink-0 text-base-content bg-blue-600 hover:bg-blue-800 hover:text-slate-300 hover:ease-in NavButtonduration-100 rounded-lg py-2 px-3 ${className}`}
            href={`/signup?callbackUrl=${encodeURIComponent(pathname)}`}
        >
            Sign Up
        </Link>
    )
}

export default SignUpButton