"use client";
import React from 'react'
import Signin from '@/app/ui/components/auth/signin'
import { Modal } from '@/app/ui/components/structural/Modal';

type Props = {
    searchParams?: Record<"callbackUrl" | "error", string>;
}


const SignInModal = (props: Props) => {

    return (
        <Modal>
            <Signin error={props.searchParams?.error} callbackUrl={props.searchParams?.callbackUrl} />
        </Modal>
    )
}

export default SignInModal