import { WishlistRepository } from "@/database/queries/wishlist/getWishlist";
import WishlistDisplay from "./WishlistDisplay";
import { getUserAccountImage } from "@/database/queries/photo/getUserAccountImage";
import Avatar from "@/app/ui/components/auth/Avatar";
import { getUserIdByUsername } from "@/database/queries/user/getUIDFromUsername";
import { getUserRoleByUID } from "@/database/queries/user/getUserRoleByUID";

interface WishlistPageProps {
    params: { username: string };
}

const WishlistPage = async ({ params }: WishlistPageProps) => {
    const { username } = params;

    // Fetch the required data
    const userUID = await getUserIdByUsername(username);
    if (!userUID) {
        return redirectToErrorPage(username);
    }

    const role = await getUserRoleByUID(userUID);
    if (!role || ["admin", "manager"].includes(role)) {
        return redirectToErrorPage(username);
    }

    const [wishlist, userProfileImage] = await Promise.all([
        new WishlistRepository().getGameByUsername(username),
        getUserAccountImage(userUID),
    ]);
    console.log(wishlist)

    return (
        <div className="pb-8">
            <div className="h-full min-h-[50em] bg-gray-900 text-white py-10 px-8 rounded-lg">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Wishlist for {username}</h1>
                    <div className="flex items-center space-x-6 my-8 w-full">
                        <Avatar
                            image={userProfileImage || undefined}
                            username={username}
                            className="ring-4 ring-offset-base-100 ring-offset-4 ring-blue-500"
                            imgSize="w-[8rem]"
                            areaExpand="8rem"
                            textSize="text-4xl"
                        />
                    </div>
                </div>
                <WishlistDisplay wishlist={wishlist} />
            </div>
        </div>
    );
}

function redirectToErrorPage(username: string) {
    return (
        <meta
            httpEquiv="refresh"
            content={`0;url=/users/${username}/wishlist/error`}
        />
    );
}

export default WishlistPage;