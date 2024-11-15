import { getServerSession } from "next-auth/next";
import { authOptions } from "@/nextauth/NextAuthOptions";
import Link from 'next/link';
import Image from 'next/image';
import LogoIcon from "@/public/icons/ours/GameTreesLogo.png";
import NavButton from "@/app/ui/components/auth/NavButton";
import SignUpButton from "@/app/ui/components/auth/SignUpButton";
import LoginButton from "@/app/ui/components/auth/LoginButton";
import SignOutButton from "@/app/ui/components/auth/SignOutButton";
import ProfileButton from "@/app/ui/components/auth/ProfileButton";
import HamburgerMenu from "@/app/ui/components/structural/HamburgerMenu"; // New component for client-side dropdown
import { getUserProfileImage } from "@/database/queries/getUserProfileImage";

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    let profileImage: string | null = null;
    if (session?.user?.username) {
        profileImage = await getUserProfileImage(session.user.username);
    }

    return (
        <header className='bg-slate-800 py-4 px-4 sm:px-8 top-0 left-0 w-full z-50 mb-8'>
            <div className='flex items-center justify-between h-20 mx-auto'>
                {/* Logo */}
                <div className='flex items-center flex-grow'>
                    <Link href='/'>
                        <Image
                            src={LogoIcon}
                            alt="Game Trees Logo"
                            quality={100}
                            className="object-contain"
                            style={{
                                width: '5em',
                                height: '5em',
                                flexShrink: 0,
                                flexGrow: 0,
                            }}
                        />
                    </Link>
                </div>

                {/* Regular Navbar Links (Visible on larger screens) */}
                <div className='flex ml-4 items-center space-x-8 text-[1.1em] font-semibold font-inter'>
                    <NavButton page="Home" route="/" className='xl:block lg:block md:hidden sm:hidden min-[380px]:hidden' />
                    <NavButton page="Wishlist" route={`/users/${session?.user?.username}/wishlist`} className='flex-shrink-0 lg:block md:block sm:hidden min-[380px]:hidden' />
                    <NavButton page="Account Settings" route="/account-settings" className='flex-shrink-0 xl:block lg:hidden md:hidden sm:hidden min-[380px]:hidden' />
                    <NavButton page="Database Accessor" route="/CURDMySQL" className='flex-shrink-0 2xl:block xl:hidden lg:hidden md:hidden sm:hidden min-[380px]:hidden' />

                    {/* Conditional Rendering based on session */}
                    {session?.user ? (
                        <>
                            <Link href={"/account-settings"} className='cursor-pointer'>
                                <ProfileButton
                                    className='w-full xl:flex lg:flex md:flex sm:flex min-[380px]:hidden'
                                    imgClassName='w-[2.8rem] h-[2.8rem]'
                                    username={session.user.username}
                                    name={session.user.name}
                                    image={profileImage ?? undefined}
                                />
                            </Link>
                            <SignOutButton className='flex-shrink-0 block xl:block lg:block md:hidden sm:hidden min-[380px]:hidden' />
                        </>
                    ) : (
                        <>
                            <LoginButton className='flex-shrink-0' />
                            <SignUpButton className='flex-shrink-0' />
                        </>
                    )}
                </div>

                {/* Hamburger Menu Button (Client-Side Dropdown) */}
                <HamburgerMenu />
            </div>
        </header>
    );
}
