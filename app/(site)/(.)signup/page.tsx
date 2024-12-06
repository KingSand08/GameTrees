"use client";
import React from 'react'
import SignUp from '@/app/ui/components/auth/SignupPage'
import Modal from '@/app/ui/components/structural/Modal';
import styles from "@/app/ui/styles/Animations/AnimatedBackground.module.css";

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>;
}


const SignUpModal = (props: Props) => {

    return (
        <>
            <div
                className={`h-screen w-screen absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-700 to-blue-500 
                            ${styles["animate-gradient"]} bg-[length:400%_400%]`}
            ></div>
            <div className="absolute inset-0 mix-blend-overlay bg-[url('/animations/patterns/dots-wave-animated.svg')] opacity-15"></div>

            {/* Modal and Rendered Child Page */}
            <Modal
                className="dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 bg-slate-800">
                <div className="">
                    {/* Sign-Up Page */}
                    <SignUp error={props.searchParams?.error} callbackUrl={props.searchParams?.callbackUrl} />
                </div>
            </Modal>
        </>
    )
}

export default SignUpModal