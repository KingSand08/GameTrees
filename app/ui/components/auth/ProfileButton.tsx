"use server";
import React from "react";
import { ClassChange } from "@/types/ui/classChange";
import { Profile } from "@/types/models/Profile";
import { LinkChange } from "@/types/ui/linkChange";
import Avatar from "./Avatar";

const ProfileButton = (props: Profile & ClassChange & LinkChange) => {
    let uname = props.username;
    let pname = props.name;

    if (props.username.length > 8) uname = props.username.substring(0, 8) + "...";
    if (props.name.length > 8) pname = props.name.substring(0, 8) + "...";

    return (
        <div
            className={`${props.className} flex items-center gap-4 bg-black sm:bg-opacity-35 bg-opacity-0 rounded-lg px-3 py-[0.6em]`}
            style={{ minWidth: "12rem" }}
        >
            <div className="flex-shrink-0">
                <Avatar
                    image={props.image}
                    username={uname}
                    className="ring-primary ring-offset-base-100"
                    imgSize="w-12"
                />
            </div>
            <div className="hidden sm:block">
                <p className="text-white text-sm font-semibold leading-tight">{uname || pname}</p>
            </div>
        </div>
    );
};

export default ProfileButton;
