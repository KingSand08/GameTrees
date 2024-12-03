import { StoreRepository } from "@/database/queries/store/StoreRepository";
import { StoreDetailRep } from "@/database/queries/store/StoreDetails";
import { StoreHoursRep } from "@/database/queries/store/StoreHoursRep";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getUserIdByUsername } from "@/database/queries/user/getUIDFromUsername";
import { getUserRoleByUID } from "@/database/queries/user/getUserRoleByUID";
import StoreDisplay from "./StoreDisplay";

interface StorePageProps {
  params: { storeId: string };
}

export default async function StorePage({ params }: StorePageProps) {
    const storeId = params.storeId;
  
    // Get server-side session (may be null if not logged in)
    const session = await getServerSession(authOptions);
    const username = session?.user.username || "";
  
    let userUID = null;
    let role = null;
  
    if (username) {
        // Fetch user ID and role only if logged in
        userUID = await getUserIdByUsername(username);
        if (!userUID) {
        return redirectToErrorPage(username);
        }
        role = await getUserRoleByUID(userUID);
    }
  
    const storeRepository = new StoreRepository();
    const storeDetailRep = new StoreDetailRep();
    const storeHoursRep = new StoreHoursRep();
  
    try {
        const [games, storeDetails, storeHours] = await Promise.all([
            storeRepository.getGamesByStoreId(storeId),
            storeDetailRep.getStoreDetails(storeId),
            storeHoursRep.getStoreHours(storeId),
        ]);
    
        // Pass data and user info to the client
        return (
            <StoreDisplay
            storeDetails={storeDetails}
            games={games}
            storeHours={storeHours}
            uid={userUID} // Null if not logged in
            userRole={role || "guest"} // Default to "guest" for unauthenticated users
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
