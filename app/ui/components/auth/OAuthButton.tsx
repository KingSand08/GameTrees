import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface OAuthButtonProps {
    provider: string;
    callbackUrl?: string;
}
const providerData: Record<string, { name: string; imageSrc: string }> = {
    google: {
        name: "Google",
        imageSrc: "/icons/providers/google.icon.png",
    },
    facebook: {
        name: "Facebook",
        imageSrc: "/icons/providers/facebook.icon.png",
    },
    github: {
        name: "GitHub",
        imageSrc: "/icons/providers/github.icon.png",
    },
    // Add other providers here as needed
};

export default function OAuthButton(props: OAuthButtonProps) {
    const provider = providerData[props.provider.toLowerCase()];

    if (!provider) {
        return <p>Unsupported provider</p>;
    }
    return (
        <>
            {/* OAuth Login */}
            {/* Process the sign-in */}
            <button
                onClick={() => signIn("google", { redirect: true, callbackUrl: props.callbackUrl })}
                className="flex items-center mb-2 border border-transparent rounded-lg shadow-sm px-4 py-3 
                    bg-blue-600 text-white font-medium hover:bg-blue-700 transition duration-200 ease-in-out 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-fit pr-[50px] text-md h-auto 
                    justify-center space-x-8"
            >
                <Image
                    alt={`${provider.name} logo`}
                    src={provider.imageSrc}
                    width={50}
                    height={50}
                />
                <p className="text-center ">
                    Sign in with {provider.name}
                </p>
            </button>
        </>
    );
}