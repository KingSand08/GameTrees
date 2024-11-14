import Image from "next/image";
import React, { useState } from 'react';
// import { fetchDataFromDB } from "../lib/simpleDbFetch"
// fetchDataFromDB();

export default function SettingsPage() {
  return (    
        <section className="flex">
            <ul className="menu menu-md bg-base-200 w-56 rounded-box">
                <li><a className="active">Account Settings</a></li>
                <li><a>Reviews</a></li>
                <li><a>Messages From Admin</a></li>
                <li><a>Help And Support</a></li>
                <li><a>Delete Account</a></li>
            </ul>
            <section className="setting-content lg">
                <h1 className="text-4xl">Account Settings</h1>
                <div className="avatar btn btn-lg btn-circle settings-space lg-pfp">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" className=" hover:opacity-75"/>
                    </div>
                </div>
                <div className="label-and-text-field settings-space">
                    <label>Username</label>
                    <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="label-and-text-field settings-space">
                    <label>Email</label>
                    <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                </div>
                <button className="btn btn-primary">Save</button>
            </section>
        </section>
);
}