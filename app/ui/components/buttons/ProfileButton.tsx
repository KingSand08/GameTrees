"use server";
import React from 'react'
import Image from "next/image"
import { ClassChange } from '@/types/ui/classChange';
import { Profile } from '@/types/models/Profile';
import { LinkChange } from '@/types/ui/linkChange';


const ProfileButton = (props: Profile & ClassChange & LinkChange) => {
    console.log(props.username)
    return (
        <div
            className={`${props.className} flex flex-row items-center gap-3 bg-black bg-opacity-35 rounded-lg px-4 py-[0.45em]`}
        >
            <Image
                src={props.image || "/default/defaultProfilePhoto.png"}
                alt="Profile"
                quality={100}
                width={100}
                height={100}
                className={`${props.imgClassName} rounded-full`}
            />
            <p className="text-white">{props.username || props.name}</p>
        </div>
    )
}

export default ProfileButton