import { ClassChange } from '@/types/ui/classChange';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const SignUpButton = ({ className }: ClassChange) => {
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

export default SignUpButton