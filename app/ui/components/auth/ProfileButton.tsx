"use server";
import React from 'react';
import { ClassChange } from '@/types/ui/classChange';
import { Profile } from '@/types/models/Profile';
import { LinkChange } from '@/types/ui/linkChange';
import Avatar from './Avatar';

const ProfileButton = (props: Profile & ClassChange & LinkChange) => {
    let uname = props.username;
    let pname = props.name;

    if (props.username.length > 8)
        uname = props.username.substring(0, 8);

    if (props.name.length > 8)
        pname = props.name.substring(0, 8);

    return (
        <div
            className={`${props.className} flex items-center gap-3 bg-black sm:bg-opacity-35 bg-opacity-0 rounded-lg px-0 sm:px-4 py-[0.6em] space-x-0 sm:space-x-3`}
        >
            <Avatar image={props.image} username={uname} className='ring-primary ring-offset-base-100 ring ring-offset-2 min' imgSize='w-12' />
            <div className="flex-shrink-0 hidden sm:block">
                <p className="text-white">{uname || pname}</p>
            </div>
        </div>
    );
};

export default ProfileButton;
