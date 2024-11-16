"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import ProfilePlaceholder from "@/public/icons/placeholder/ProfilePlaceholder.png"; // Fallback image

/**
 * ProfileImage Component
 * Fetches and displays the user's profile image.
 */
const ProfileImage = () => {
    const { data: session } = useSession();
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        if (!session?.user?.username) return;

        const fetchProfileImage = async () => {
            try {
                const response = await fetch(`/api/users/${session.user.username}/profile-image`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch profile image: ${response.statusText}`);
                }
                const data = await response.json();
                setProfileImage(data?.image || null);
            } catch (error) {
                console.error("Error fetching profile image on the client:", error);
            }
        };

        fetchProfileImage();
    }, [session?.user?.username]);

    return (
        <div className="flex items-center">
            {profileImage ? (
                <Image
                    src={profileImage}
                    alt={`${session?.user?.name || "User"}'s Profile Picture`}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />
            ) : (
                <Image
                    src={ProfilePlaceholder}
                    alt="Default Profile Placeholder"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                />
            )}
        </div>
    );
};

export default ProfileImage;
