import { StoreRepository } from "@/database/queries/store/StoreRepository";
import { StoreDetailRep } from "@/database/queries/store/StoreDetailRep";
import { StoreHoursRep } from "@/database/queries/store/StoreHoursRep";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getUserIdByUsername } from "@/database/queries/user/getUIDFromUsername";
import { getUserRoleByUID } from "@/database/queries/user/getUserRoleByUID";
import StoreDisplay from "./StoreDisplay";
import getUserWishlist from "@/database/queries/wishlist/getWishlist";
import getStoreIdFromUserId from "@/database/queries/store/getStoreIDFromUserID"
import { getManagerIdFromStoreId } from "@/database/queries/store/getManager";
import { StoreImages } from "@/database/queries/store/StoreImages";

interface StorePageProps {
  params: { storeId: string };
}

export default async function StorePage({ params }: StorePageProps) {
    const storeId = params.storeId;
  
    // Get server-side session (may be null if not logged in)
    const session = await getServerSession(authOptions);
    const username = session?.user.username || "";
    const managerId = await getManagerIdFromStoreId(storeId);
  
    let userUID = null;
    let role = null;
    let canEdit = false;
  
    if (username) {
        // Fetch user ID and role only if logged in
        userUID = await getUserIdByUsername(username);
        if (!userUID) {
        return redirectToErrorPage(username);
        }

        role = await getUserRoleByUID(userUID); 

        if (userUID === managerId) canEdit = true; // Allow edition for assigned managers
    }
  
    const storeRepository = new StoreRepository();
    const storeDetailRep = new StoreDetailRep();
    const storeHoursRep = new StoreHoursRep();
    const storeImages = new StoreImages();
  
    try {
        const [images, games, storeDetails, storeHours, wishlist] = await Promise.all([
            storeImages.getStoreImages(storeId),
            storeRepository.getGamesByStoreId(storeId),
            storeDetailRep.getStoreDetails(storeId),
            storeHoursRep.getStoreHours(storeId),
            getUserWishlist(username),
            getStoreIdFromUserId(userUID),
        ]);
    
        // Pass data and user info to the client
        return (
            <StoreDisplay
            images={images}
            storeId={storeId}
            storeDetails={storeDetails}
            games={games}
            storeHours={storeHours}
            uid={userUID} // Null if not logged in
            userRole={role || "guest"} // Default to "guest" for unauthenticated users
            wishlist={wishlist}
            canEdit = {canEdit}
            />
        );
    } catch (error) {
        console.error("Error fetching store data:", error);
        return (
            <div>
                <h1>Store Page for Store ID: {storeId}</h1>
                <p>Failed to load store data.</p>
            </div>
        );
    }
}
  
function redirectToErrorPage(username: string) {
    return (
        <meta
            httpEquiv="refresh"
            content={`0;url=/users/${username}/wishlist/error`}
        />
    );
}
