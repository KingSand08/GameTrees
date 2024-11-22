import React from "react";
import Image from "next/image";

type AvatarProps = {
    image?: string; // URL or Base64 for the image
    username?: string; // User's name for placeholder initials
    className?: string; // Additional styles
    size: string; // Avatar size (e.g., "3.5rem", "4rem")
    textSize?: string; // Text size for initials (optional)
};

const Avatar: React.FC<AvatarProps> = ({ image, username, className = "", size, textSize = "text-xl" }) => {
    return (
        <div
            className={`flex items-center justify-center rounded-full overflow-hidden flex-shrink-0 ${className}`}
            style={{
                width: size || "3.6em",
                height: size,
                backgroundColor: image ? "transparent" : "#374151", // Tailwind gray-700 for placeholder
                aspectRatio: '1 / 1',
            }}
        >
            {image ? (
                <Image
                    src={image}
                    alt="Profile Image"
                    width={500}
                    height={500}
                    quality={100}
                    className="object-cover w-full h-full"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />
            ) : (
                <span
                    className={`${textSize} text-neutral-content`} // Centered white initials
                    style={{
                        lineHeight: size, // Align text vertically
                        textAlign: "center",
                    }}
                >
                    {username?.substring(0, 2)?.toUpperCase() || "?"}
                </span>
            )}
        </div>
    );
};

export default Avatar;
