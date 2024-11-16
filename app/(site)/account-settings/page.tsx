// app/account-settings/page.tsx (Server Component)
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/nextauth/NextAuthOptions";
import Avatar from "@/app/ui/components/auth/Avatar";
import { getUserProfileImage } from "@/database/queries/getUserProfileImage";
import AccountSettingsPageWrapper from "./AccountSettingsWrapper";
import SignOutButton from "@/app/ui/components/auth/SignOutButton";

export default async function AccountSettingsPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return <p className="text-center text-red-500">You need to be logged in to access account settings.</p>;
    }

    // Fetch the profile image from the database
    const profileImage = session.user.username
        ? await getUserProfileImage(session.user.id as unknown as number)
        : null;

    return (
        <div className="pb-[5rem]">
            <div className="flex justify-center">
                <div className="w-[90%] max-w-4xl bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-white mb-8 text-center">Account Settings</h1>

                    {/* Profile Avatar */}
                    <div className="flex flex-col space-y-2 mb-10 w-full">
                        <div className="flex items-center space-x-6 mb-8 w-full">
                            <Avatar
                                image={profileImage || undefined} // Pass Base64 image or undefined
                                username={session.user.username}
                                className="ring-2 ring-blue-500"
                                imgSize="w-[8rem]"
                                areaExpand="8rem"
                                textSize="text-4xl"
                            />
                            <div className="text-white w-full">
                                <p className="text-lg font-semibold">{session.user.name || "Anonymous"}</p>
                                <p className="text-sm text-gray-300">Username: {session.user.username}</p>
                                <p className="text-sm text-gray-300">Email: {session.user.email}</p>
                                <p className="text-sm text-gray-300">UID: {session.user.id}</p>
                                <SignOutButton className="mt-5 px-3 py-2 w-full" />
                            </div>
                        </div>

                    </div>

                    {/* Client Component for Upload */}
                    <AccountSettingsPageWrapper />
                </div>
            </div>
        </div>
    );
}
