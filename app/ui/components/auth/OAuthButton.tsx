import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import GoogleImage from "@/public/icons/providers/google.icon.png";

// Define the props interface
interface OAuthButtonProps {
    provider: string; // Provider name (needed only if we add more providers)
    callbackUrl?: string;
}


export default function OAuthButton(props: OAuthButtonProps) {
    return (
        <>
            {/* OAuth Login */}
            {/* Process the sign-in */}
            <button
                onClick={() => signIn("google", { redirect: true, callbackUrl: props.callbackUrl })}
                className="flex items-center mb-2 border border-transparent rounded-md shadow-sm px-4 py-2 
                    bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 ease-in-out 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full"
            >
                <Image
                    alt={`Google logo`}
                    src={GoogleImage}
                    width={40}
                    height={40}
                />
                <p className="flex-grow text-center">
                    Sign in with {'Google'}
                </p>
            </button>
        </>
    )
}