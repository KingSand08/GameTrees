"use client";
import React, { use } from "react";
import Signin from '@/app/ui/components/auth/SigninPage'
import Modal from "@/app/ui/components/structural/Modal";
import styles from "@/app/ui/styles/Animations/AnimatedBackground.module.css";

type Props = {
    searchParams: Promise<{ callbackUrl?: string; error?: string; }>
};

const SignInModal = (props: Props) => {
    const searchParams = use(props.searchParams);
    return (
        <>
            {/* Background Design */}
            <div
                className={`h-screen w-screen absolute inset-0 bg-gradient-to-br from-purple-500 via-indigo-700 to-blue-500 
                            ${styles["animate-gradient"]} bg-[length:400%_400%]`}
            ></div>
            <div className="absolute inset-0 mix-blend-overlay bg-[url('/animations/patterns/dots-wave-animated.svg')] opacity-15"></div>

            {/* Modal and Rendered Child Page */}
            <Modal
                callbackUrl={searchParams?.callbackUrl}
                className="dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900 bg-slate-800">
                <div className="">
                    {/* Sign-in Card */}
                    <Signin error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
                </div>
            </Modal>
        </>
    );
};

export default SignInModal;
