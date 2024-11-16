import React from "react";
import Image from "next/image";

type AvatarProps = {
    image?: string;
    username?: string;
    className?: string;
    imgSize: string;
};

const Avatar: React.FC<AvatarProps> = ({ image, username, className, imgSize }) => {
    return (
        <div className="flex items-center justify-center">
            {image ? (
                <div
                    className="avatar flex items-center justify-center"
                    style={{
                        width: '3.4rem',
                        aspectRatio: '1 / 1',
                    }}
                >
                    <div className={`${className} ${imgSize} rounded-full`}>
                        <Image
                            src={image || "/default/defaultProfilePhoto.png"}
                            alt="Profile Image"
                            width={100}
                            height={100}
                            quality={100}
                            className="rounded-full object-cover"
                        />
                    </div>
                </div>
            ) : (
                <div className="avatar placeholder flex items-center justify-center">
                    <div className={`${className} ${imgSize} h-auto rounded-full flex items-center justify-center`}>
                        <div className="bg-neutral text-neutral-content w-[3rem] h-[3rem] rounded-full flex items-center justify-center">
                            <span className="text-xl">
                                {username?.substring(0, 2)?.toUpperCase() || "?"}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Avatar;
