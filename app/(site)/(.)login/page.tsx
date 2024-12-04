"use client";
import React from "react";
import Signin from '@/app/ui/components/auth/SigninPage'
import Modal from "@/app/ui/components/structural/Modal";

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>;
};

const SignInModal = ({ searchParams }: Props) => {
    return (
        <div className="min-h-screen">
            <Modal callbackUrl={searchParams?.callbackUrl}>
                <Signin error={searchParams?.error} callbackUrl={searchParams?.callbackUrl} />
            </Modal>
        </div>
    );
};

export default SignInModal;
