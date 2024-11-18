import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface OAuthButtonProps {
    provider: string;
    callbackUrl?: string;
    onSignInStart?: () => void;
}

const providerData: Record<string, { name: string; imageSrc: string; bgColor: string, bgOnClick: string }> = {
    google: {
        name: "Google",
        imageSrc: "/icons/providers/google.icon.png",
        bgColor: "bg-blue-600 hover:bg-blue-700",
        bgOnClick: "bg-blue-700",
    },
    discord: {
        name: "Discord",
        imageSrc: "/icons/providers/discord.icon.png",
        bgColor: "bg-[#5165f6] hover:bg-[#323fa1]",
        bgOnClick: "bg-[#323fa1]",
    },
    github: {
        name: "GitHub",
        imageSrc: "/icons/providers/github.icon.png",
        bgColor: "bg-[#1a1a1a] hover:bg-[#0f0f0f]",
        bgOnClick: "bg-[#0f0f0f]",
    },
};

export default function OAuthButton(props: OAuthButtonProps) {
    const [isSigningIn, setIsSigningIn] = useState(false);

    const provider = providerData[props.provider.toLowerCase()];

    if (!provider) {
        return <p>Unsupported provider</p>;
    }

    const handleSignIn = async () => {
        if (props.onSignInStart) {
            props.onSignInStart();
        }
        setIsSigningIn(true);

        try {
            await signIn(provider.name.toLowerCase(), { redirect: true, callbackUrl: props.callbackUrl });
        } catch (error) {
            console.error(`Sign in with ${provider.name} failed`, error);
            setIsSigningIn(false);
        }
    };

    return (
        <button
            onClick={handleSignIn}
            className={`relative flex items-center mb-2 border border-transparent rounded-lg shadow-sm px-4 py-3
                ${isSigningIn ? provider.bgOnClick : provider.bgColor
                } text-white font-medium transition duration-200 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-full text-md h-auto
                justify-center space-x-4 ${isSigningIn ? "cursor-not-allowed opacity-75" : ""}`}
            disabled={isSigningIn}
        >
            {/* Button Content */}
            <div className={`${isSigningIn ? "opacity-25" : "opacity-100"} flex items-center space-x-4`}>
                <Image
                    alt={`${provider.name} logo`}
                    src={provider.imageSrc}
                    width={50}
                    height={50}
                />
                <p className="text-center">
                    Sign in with {provider.name}
                </p>
            </div>

            {/* Overlay Spinner */}
            {isSigningIn && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="loading loading-bars loading-sm text-white"></span>
                </div>
            )}
        </button>
    );
}
