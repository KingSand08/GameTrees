"use server";
import React from "react";
import { ClassChange } from "@/types/ui/classChange";
import { Profile } from "@/types/models/Profile";
import { LinkChange } from "@/types/ui/linkChange";
import Avatar from "./Avatar";

const ProfileButton = (props: Profile & ClassChange & LinkChange) => {
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
            <Avatar image={props.image} username={uname} className='ring-primary ring-offset-base-100 ring ring-offset-2 min' size='3.5em' />
            <div className="flex-shrink-0 hidden sm:block">
                <p className="text-white">{uname || pname || lname}</p>
            </div>
        </div>
    );
};

export default ProfileButton;
