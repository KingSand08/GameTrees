"use server";
import React from 'react';
import { ClassChange } from '@/types/ui/classChange';
import { Profile } from '@/types/models/Profile';
import { LinkChange } from '@/types/ui/linkChange';
import Avatar from './Avatar';

const ProfileButton = (props: Profile & ClassChange & LinkChange) => {
    console.log(props.username);
    return (
        <div
            className={`${props.className} flex items-center gap-3 bg-black bg-opacity-35 rounded-lg px-4 py-[0.6em] space-x-3`}
        >
            <Avatar image={props.image} username={props.username} className='ring-primary ring-offset-base-100 ring ring-offset-2' imgSize='w-12' />
            <p className="text-white">{props.username || props.name}</p>
        </div>
    );
};

export default ProfileButton;
