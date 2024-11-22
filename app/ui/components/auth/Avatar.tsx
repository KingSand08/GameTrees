import React from "react";
import Image from "next/image";

type AvatarProps = {
    image?: string;
    username?: string;
    className?: string;
    imgSize?: string; // Size class for the avatar (e.g., "w-24", "w-16", etc.)
    textSize?: string; // Font size for initials (e.g., "text-xl")
};

const Avatar: React.FC<AvatarProps> = ({
    image,
    username,
    className = "",
    imgSize = "w-24", // Default size
    textSize,
}) => {
    // Determine text size dynamically if not provided
    const getTextSize = () => {
        switch (imgSize) {
            case "w-24":
                return "text-3xl";
            case "w-16":
                return "text-xl";
            case "w-12":
                return "text-base";
            case "w-8":
                return "text-xs";
            default:
                return textSize || "text-lg"; // Default size if custom class is passed
        }
    };

    return (
        <div className={`avatar ${className}`}>
            {image ? (
                <div className={`${imgSize} rounded-full ring-primary ring-offset-base-100 ring ring-offset-2`}>
                    <Image
                        src={image}
                        alt="Profile Avatar"
                        width={96} // Match "w-24" or override dynamically
                        height={96}
                        quality={100}
                        className="rounded-full object-cover"
                    />
                </div>
            ) : (
                <div className={`avatar placeholder bg-neutral text-neutral-content ${imgSize} rounded-full flex items-center justify-center`}>
                    <span className={`${getTextSize()}`}>
                        {username?.substring(0, 2)?.toUpperCase() || "?"}
                    </span>
                </div>
            )}
        </div>
    );
};

export default Avatar;
