import React from "react";
import Image from "next/image";

type AvatarProps = {
    image?: string;
    username?: string;
    className?: string;
    imgSize: string;
    areaExpand?: string;
    textSize?: string;
};

const Avatar: React.FC<AvatarProps> = ({ image, username, className, imgSize, areaExpand, textSize }) => {
    const txtSize = textSize ?? "text-xl";
    return (
        <div className="flex items-center justify-center">
            {image ? (
                <div
                    className="avatar flex items-center justify-center"
                    style={{
                        width: `${areaExpand || "3.4rem"}`,
                        aspectRatio: '1 / 1',
                    }}
                >
                    <div className={`${className} ${imgSize} rounded-full`}>
                        <Image
                            src={image || "/default/defaultProfilePhoto.png"}
                            alt="Profile Image"
                            width={500}
                            height={500}
                            quality={100}
                            className="rounded-full object-cover"
                        />
                    </div>
                </div>
            ) : (
                <div
                    className="flex items-center justify-center"
                    style={{
                        width: `${areaExpand || "3.5rem"}`,
                        aspectRatio: "1 / 1",
                        clipPath: "circle()",
                    }}
                >
                    <div className="avatar placeholder flex items-center justify-center w-[80%]">
                        <div className={`${className} ${imgSize} h-auto rounded-full flex items-center justify-center w-full`}>
                            <div
                                className={`bg-neutral text-neutral-content w-full h-full rounded-full flex items-center justify-center`}
                                style={{
                                    clipPath: "circle()", // Ensures the text background stays circular
                                }}
                            >
                                <span className={`${txtSize}`}>
                                    {username?.substring(0, 2)?.toUpperCase() || "?"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Avatar;
