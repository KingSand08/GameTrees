"use client";
import React from 'react'
import Signin from '@/app/ui/components/auth/SigninPage'
import styles from "@/app/ui/styles/Animations/AnimatedBackground.module.css";

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>;
}


const Page = (props: Props) => {

    return (
        <div className="relative min-h-screen inset-0">
            {/* Background Design */}
            <div
                className={`h-screen w-screen absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-700 to-blue-500 -m-8
                            ${styles["animate-gradient"]} bg-[length:400%_400%]`
                }
            ></div>
            <div className="absolute inset-0 mix-blend-overlay bg-[url('/animations/patterns/dots-wave-animated.svg')] opacity-15 -m-8"></div>

            <div className='relative z-10 flex justify-center m-0 md:m-[2em] min-h-screen'>
                <div className='w-screen md:w-3/4 lg:w-1/2 p-6 dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 bg-slate-800 rounded-lg shadow-lg h-fit'>
                    <Signin
                        error={props.searchParams?.error}
                        callbackUrl={props.searchParams?.callbackUrl}
                    />
                </div>
            </div>
        </div>
    )
}

export default Page