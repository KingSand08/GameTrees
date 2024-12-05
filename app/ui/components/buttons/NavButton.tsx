import { ClassChange } from '@/types/ui/classChange';
import { LinkChange } from '@/types/ui/linkChange';
import { Url } from 'next/dist/shared/lib/router/router';
import Link from 'next/link';
import React from 'react'

const NavButton = ({ className, route, page }: ClassChange & LinkChange) => {
    return (
        <Link
            className={`flex-shrink-0 hover:ease-in duration-100 rounded-lg py-2 px-3 ${className}`}
            href={route as Url}
        >
            {page}
        </Link>
    );
}

export default NavButton