import Image from "next/image";

// import { fetchDataFromDB } from "../lib/simpleDbFetch"
// fetchDataFromDB();

export default function SettingsPage() {
  return (
    <html>
        <head>
            <title>Account Settings</title>
        </head>
        <body> 
        <section>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">GameManager+</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="form-control">
                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
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
                <div className="label-and-text-field">
                    <label>Username</label>
                    <input type="text" placeholder="Username" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="label-and-text-field">
                    <label>Email</label>
                    <input type="text" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                </div>
                <button className="btn btn-primary">Save</button>
            </section>
        </section>
        
        </body>
        
    </html>
);
}