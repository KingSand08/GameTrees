import { getServerSession } from "next-auth/next";
import { authOptions } from "@/nextauth/NextAuthOptions";
import Avatar from "@/app/ui/components/auth/Avatar";
import { getUserAccountImage } from "@/database/queries/photo/getUserAccountImage";
import SignOutButton from "@/app/ui/components/auth/SignOutButton";

export default async function AccountSettingsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return (
            <p className="text-center text-error text-xl">
                You need to be logged in to access account settings.
            </p>
        );
    }

    // Fetch the profile image from the database
    const profileImage = session.user.username
        ? await getUserAccountImage(session.user.id as unknown as number)
        : null;

    return (
        <section className="flex min-h-screen pb-10 bg-neutral text-base-content">
            {/* Sidebar Menu */}
            <ul className="menu menu-md bg-base-200 w-56 rounded-box shadow-lg">
                <li>
                    <a className="active text-primary">Account Settings</a>
                </li>
                <li>
                    <a className="hover:text-secondary">Reviews</a>
                </li>
                <li>
                    <a className="hover:text-secondary">Messages From Admin</a>
                </li>
                <li>
                    <a className="hover:text-secondary">Help And Support</a>
                </li>
                <li>
                    <a className="hover:text-error">Delete Account</a>
                </li>
            </ul>

            {/* Content Area */}
            <section className="setting-content flex-grow lg px-8">
                <h1 className="text-4xl mb-8 font-bold text-center text-primary">
                    Account Settings
                </h1>

                {/* Profile Avatar Section */}
                <div className="avatar btn btn-lg btn-circle settings-space lg-pfp mx-auto mb-8">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                    <Avatar
                        image={profileImage || undefined} // Dynamically fetched image
                        username={session.user.username}
                        className="ring-primary ring-offset-base-100"
                        imgSize="w-16"
                        textSize="text-lg"
                    />

                    </div>
                </div>

                {/* Editable User Details */}
                <div className="label-and-text-field settings-space mb-6">
                    <label className="block mb-2 text-base-content font-semibold">
                        Username
                    </label>
                    <input
                        type="text"
                        defaultValue={session.user.username}
                        placeholder="Username"
                        className="input input-bordered w-full max-w-xs bg-base-100 text-base-content focus:outline-primary"
                    />
                </div>
                <div className="label-and-text-field settings-space mb-6">
                    <label className="block mb-2 text-base-content font-semibold">
                        Email
                    </label>
                    <input
                        type="text"
                        defaultValue={session.user.email}
                        placeholder="Email"
                        className="input input-bordered w-full max-w-xs bg-base-100 text-base-content focus:outline-primary"
                    />
                </div>

                {/* Save and Sign Out Buttons */}
                <div className="flex flex-col items-center">
                    <button className="btn btn-primary w-full max-w-xs mb-4">
                        Save
                    </button>
                    <SignOutButton className="btn btn-error w-full max-w-xs" />
                </div>
            </section>
        </section>
    );
}
