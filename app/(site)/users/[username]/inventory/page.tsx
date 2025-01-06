import InventoryDisplay from "./InventoryDisplay";
import { getUserAccountImage } from "@/database/queries/photo/getUserAccountImage";
import Avatar from "@/app/ui/components/auth/Avatar";
import { getUserIdByUsername } from "@/database/queries/user/getUIDFromUsername";
import { getUserRoleByUID } from "@/database/queries/user/getUserRoleByUID";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getStoreByMid, getUnclaimedStores } from "@/database/queries/store/getStoreByMid";
import { getAllGames } from "@/database/queries/game/getAllGames";
import getAllBusinesses from "@/database/queries/business/getAllBusinessData"

interface InventoryPageProps {
    params: { username: string };
}

const InventoryPage = async ({ params }: InventoryPageProps) => {
    const { username } = params;

    const session = await getServerSession(authOptions);

    // Fetch the required data
    const managerId = await getUserIdByUsername(username);
    const myId = await getUserIdByUsername(session?.user.username || "");
    let canEdit = false;
    
    // Manager can only modify own inventory
    if (myId === managerId) canEdit = true;

    if (!managerId) {
        return redirectToErrorPage(username);
    }

    const role = await getUserRoleByUID(managerId);
    if (!role || ["admin", "customer"].includes(role)) {
        return redirectToErrorPage(username);
    }

    const [stores, myStores, unclaimedStores, userProfileImage, games, businesses] = await Promise.all([
        await getStoreByMid(managerId),
        await getStoreByMid(myId),
        await getUnclaimedStores(),
        await getUserAccountImage(managerId),
        await getAllGames(),
        await getAllBusinesses(),
    ]);

    return (
        <div className="h-full min-h-[50em] rounded-lg">
            <div className="mb-6">
                <h1 className="text-3xl text-base-content font-bold">Stores managed by {username}</h1>
                <div className="flex items-center max-[1200px]:justify-center space-x-6 my-8 w-full">
                    <Avatar
                        image={userProfileImage || undefined}
                        username={username}
                        className={`ring-4 ring-offset-base-100 ring-offset-4 ${session?.user.username === username ?
                            "ring-primary" : "ring-secondary"}`}
                        size="10em"
                        textSize="text-5xl"
                    />
                </div>
            </div>
            <InventoryDisplay
                stores={stores}
                myStores={myStores}
                unclaimedStores={unclaimedStores}
                games={games}
                businesses={businesses}
                uid={session?.user.id as unknown as string}
                userRole={role}
                canEdit = {canEdit}
            />
        </div>
    );
}

function redirectToErrorPage(username: string) {
    return (
        <meta
            httpEquiv="refresh"
            content={`0;url=/users/${username}/inventory/error`}
        />
    );
}

export default InventoryPage;