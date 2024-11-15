import { ClassChange } from '@/types/ui/classChange';
import { LinkChange } from '@/types/ui/linkChange';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import React from 'react'

const SignOutButton = ({ className, route, page }: ClassChange & LinkChange) => {
    return (
        <Link
            className={`flex-shrink-0 text-white hover:bg-white hover:text-slate-800 hover:ease-in duration-100 rounded-lg py-2 px-3 ${className}`}
            href={route as Url}
        >
            {page}
        </Link>
    );
}

export default SignOutButton