"use server";
import React from "react";
import { ClassChange } from "@/types/ui/classChange";
import { Profile } from "@/types/models/Profile";
import { LinkChange } from "@/types/ui/linkChange";
import Avatar from "./Avatar";
export interface AvatarClassChange {
    avatarClassName?: string;
}

const ProfileButton = (props: Profile & ClassChange & LinkChange & AvatarClassChange) => {
    let uname = props.username;
    let pname = props.firstname;
    let lname = props.lastname;

    if (props.username.length > 8) uname = props.username.substring(0, 8) + "...";
    if (props.firstname != null && props.firstname.length > 8) pname = props.firstname.substring(0, 8) + "...";
    if (props.lastname != null && props.lastname.length > 8) lname = props.lastname.substring(0, 8) + "...";

    return (
        <div
            className={`${props.className} flex items-center gap-5 bg-black sm:bg-opacity-15 bg-opacity-0 rounded-lg pl-4 pr-5 py-[0.8em]`}
        >
            <Avatar image={props.image} username={uname} className={`${props.avatarClassName || "ring-offset-base-100 ring-offset-2"} ring ring-primary min`} size='3.5em' />
            <div className="flex-shrink-0 hidden sm:block">
                <p className="text-neutral-content">{uname || pname || lname}</p>
            </div>
        </div>
    );
};

export default ProfileButton;
