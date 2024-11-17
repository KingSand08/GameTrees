import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface OAuthButtonProps {
    provider: string;
    callbackUrl?: string;
}
const providerData: Record<string, { name: string; imageSrc: string; bgColor: string }> = {
    google: {
        name: "Google",
        imageSrc: "/icons/providers/google.icon.png",
        bgColor: "bg-blue-600 hover:bg-blue-700",
    },
    facebook: {
        name: "Facebook",
        imageSrc: "/icons/providers/facebook.icon.png",
        bgColor: "",
    },
    github: {
        name: "GitHub",
        imageSrc: "/icons/providers/github.icon.png",
        bgColor: "",
    },
    discord: {
        name: "Discord",
        imageSrc: "/icons/providers/discord.icon.png",
        bgColor: "bg-[#5165f6] hover:bg-[#323fa1]"
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
                onClick={() => signIn(provider.name.toLowerCase(), { redirect: true, callbackUrl: props.callbackUrl })}
                className={`flex items-center mb-2 border border-transparent rounded-lg shadow-sm px-4 py-3
                    ${provider.bgColor} text-white font-medium transition duration-200 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 w-fit pr-[50px] text-md h-auto
                    justify-center space-x-8`}
            >
                <Image
                    alt={`${provider.name} logo`}
                    src={provider.imageSrc}
                    width={50}
                    height={50}
                />
                <p className="text-center">
                    Sign in with {provider.name}
                </p>
            </button >
        </>
    );
}