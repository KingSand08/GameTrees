import { getServerSession } from "next-auth/next";
import { authOptions } from "@/nextauth/NextAuthOptions";
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from "@/public/icons/ours/GameTreesLogo.png";
import NavButton from "@/app/ui/components/buttons/NavButton";
import SignUpButton from "@/app/ui/components/auth/SignUpButton";
import LoginButton from "@/app/ui/components/auth/LoginButton";
import SignOutButton from "@/app/ui/components/auth/SignOutButton";
import ProfileButton from "@/app/ui/components/auth/ProfileButton";
import HamburgerMenu from "@/app/ui/components/structural/HamburgerMenu";
import { getUserAccountImage } from "@/database/queries/photo/getUserAccountImage";
import SearchBar from "@/app/ui/components/structural/SearchBar";

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    let profileImage: string | null = null;
    if (session?.user?.username) {
        profileImage = await getUserAccountImage(session.user.id as unknown as number);
    }

    return (
        <header className="bg-slate-700 dark:bg-slate-800 text-white h-fit min-[1200px]:max-h-32 max-h-48">
            <div className="container w-full min-h-20">
                {/* Top Header Section */}
                <div className="w-screen flex items-center justify-between py-5 min-h-20">
                    {/* Logo */}
                    <div className='flex items-center px-5 min-h-20'>
                        <Link href='/'>
                            <div
                                className="avatar flex items-center justify-center"
                                style={{
                                    width: `${"4em"}`,
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
                    </div>

                    {/* Search Bar */}
                    <div className="hidden min-[1200px]:flex flex-1 mx-4 max-w-full">
                        <SearchBar actionUrl={""} />
                    </div>

                    <div className="flex items-center justify-end py-4 max-h-[80px]">
                        {/* Desktop Navigation */}
                        <div className="flex items-center gap-8 ml-4">
                            <NavButton page="Home" route="/" className='self-center hidden min-[430px]:block text-[1em]' />
                            <NavButton page="Games" route="/temp/all-games" className='self-center hidden min-[530px]:block text-[1em]' />
                            {session?.user.role === "customer" && (
                                <NavButton page="Wishlist" route={`/users/${session?.user?.username}/wishlist`} className='flex-shrink-0 hidden min-[830px]:block text-[1em]' />
                            )}
                            {session?.user.role === "admin" && (
                                <>
                                    <NavButton page="Admin User View" route="/admin/user-view" className='flex-shrink-0 hidden min-[780px]:block text-[1em]' />
                                </>
                            )}
                            {session?.user.role === "manager" && (
                                <NavButton page="Inventory" route={`/users/${session?.user?.username}/inventory`} className='flex-shrink-0 hidden min-[830px]:block text-[1em]' />
                            )}

                            {/* Conditional Rendering based on session */}
                            {session?.user ? (
                                <>
                                    <Link href={"/account-settings"} className='cursor-pointer'>
                                        <ProfileButton
                                            avatarClassName="ring-offset-2 ring-offset-slate-500 dark:ring-offset-slate-800"
                                            className="hidden min-[330px]:flex h-[80px]"
                                            username={session.user.username}
                                            firstname={session.user.firstname}
                                            lastname={session.user.lastname}
                                            image={profileImage ?? undefined}
                                        />
                                    </Link>
                                    <SignOutButton className='flex-shrink-0 hidden min-[1200px]:block px-3 py-2 text-[1em]' />
                                </>
                            ) : (
                                <>
                                    <LoginButton className='flex-shrink-0 text-[1em]' />
                                    <SignUpButton className='flex-shrink-0 hidden min-[750px]:block text-[1em]' />
                                </>
                            )}
                        </div>

                        {/* Hamburger Menu Button (Client-Side Dropdown) */}
                        <HamburgerMenu />
                    </div>

                </div>

                {/* Search Bar (Visible Only on Mobile) */}
                <div className="block min-[1200px]:hidden w-full px-4 pt-1 pb-8 text-[1em]">
                    <SearchBar actionUrl={""} />
                </div>
            </div>
        </header >
    );
}
