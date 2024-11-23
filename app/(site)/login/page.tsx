"use client";
import React from 'react'
import Signin from '@/app/ui/components/auth/SigninPage'

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>;
}


const Page = (props: Props) => {

    return (
        <div className='flex justify-center m-0 md:m-[2em] min-h-screen'>
            <div className='w-screen md:w-3/4 lg:w-1/2 p-6 bg-gray-800 rounded-lg shadow-lg h-fit'>
                <Signin
                    error={props.searchParams?.error}
                    callbackUrl={props.searchParams?.callbackUrl}
                />
            </div>
        </div>
    )
}

export default Page