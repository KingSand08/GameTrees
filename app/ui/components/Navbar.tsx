import { getServerSession } from "next-auth/next";
import { authOptions } from "@/nextauth/NextAuthOptions";
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from "@/public/icons/ours/GameTreesLogo.png";
import NavButton from "@/app/ui/components/buttons/NavButton";
import SignUpButton from "@/app/ui/components/auth/SignUpButton";
import LoginButton from "@/app/ui/components/auth/LoginButton";
import SignOutButton from "@/app/ui/components/auth/SignOutButton";
import HamburgerMenu from "@/app/ui/components/structural/HamburgerMenu";
import { getUserAccountImage } from "@/database/queries/photo/getUserAccountImage";
import SearchBar from "@/app/ui/components/structural/SearchBar";
import ProfileButton from "@/app/ui/components/auth/ProfileButton";

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    let profileImage: string | null = null;
    if (session?.user?.username) {
        profileImage = await getUserAccountImage(session.user.id as unknown as number);
    }

    return (
        <div className="navbar bg-slate-800 text-white px-4 sm:px-8 top-0 left-0 w-full z-50">
            {/* Left Side: Logo and Search Bar */}
            <div className="flex-1 flex items-center">
                <Link href="/" className="flex items-center gap-4">
                    <div
                        className="avatar"
                        style={{
                            width: "4em",
                            aspectRatio: '1 / 1',
                        }}
                    >
                        <Image
                            src={LogoIcon}
                            alt="Game Trees Logo"
                            width={500}
                            height={500}
                            quality={100}
                            className="rounded-full object-cover"
                            priority
                        />
                    </div>
                </Link>
                <div className="ml-4 flex-grow hidden sm:block">
                    <SearchBar actionUrl="" />
                </div>
            </div>

            {/* Right Side: Links and Buttons */}
            <div className="flex-none flex gap-4 items-center">
                <div className="hidden sm:flex items-center gap-4 text-sm font-semibold">
                    <NavButton page="Home" route="/" />
                    {session?.user?.role === "customer" && (
                        <NavButton page="Wishlist" route={`/users/${session?.user?.username}/wishlist`} />
                    )}
                    {session?.user?.role === "admin" && (
                        <NavButton page="Admin User View" route="/admin/user-view" />
                    )}
                </div>

                {/* Profile Section */}
                {session?.user ? (
                    <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="flex items-center"
                    >
                        <ProfileButton
                            username={session.user.username}
                            name={session.user.name}
                            image={profileImage ?? undefined}
                            className="w-full"
                        />
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 text-base-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <Link href="/account-settings">Profile</Link>
                        </li>
                        <li>
                            <SignOutButton />
                        </li>
                    </ul>
                </div>
                
                ) : (
                    <div className="flex items-center gap-4">
                        <LoginButton />
                        <SignUpButton />
                    </div>
                )}

                {/* Hamburger Menu */}
                <div className="sm:hidden">
                    <HamburgerMenu />
                </div>
            </div>
        </div>
    );
}
