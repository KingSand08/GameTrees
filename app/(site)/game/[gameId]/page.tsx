import { AllStores } from "@/database/queries/game/AllStores";
import { getServerSession } from "next-auth";
import { authOptions } from "@/nextauth/NextAuthOptions";
import { getUserIdByUsername } from "@/database/queries/user/getUIDFromUsername";
import { getUserRoleByUID } from "@/database/queries/user/getUserRoleByUID";
import GameDisplay from "./GameDisplay";
import { getGamesByID } from "@/database/queries/game/getGameDetails";
import getUserWishlist from "@/database/queries/wishlist/getWishlist";

// @next-codemod-ignore Cache Components adoption: this segment temporarily allows blocking.
// Remove this opt-out after verifying the segment passes validation without it.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
// export const instant = false;

interface GamePageProps {
  params: Promise<{ gameId: string }>;
}

export default async function GamePage(props: GamePageProps) {
  const params = await props.params;
  const gameId = params.gameId;

  // Get server-side session (may be null if not logged in)
  const session = await getServerSession(authOptions);
  const username = session?.user?.username || "";

  let userUID = null;
  let role = null;

  if (username) {
    userUID = await getUserIdByUsername(username);
    if (!userUID) {
      return redirectToErrorPage(username);
    }
    role = await getUserRoleByUID(userUID);
  }

  //   const gameDetail = await getGamesByID(gameId);
  const allStores = new AllStores();
  try {
    const [details, stores, wishlist] = await Promise.all([
      getGamesByID(gameId),
      allStores.getAllStoresByGid(gameId),
      getUserWishlist(username),
    ]);

    // Pass data and user info to the client
    return (
      <GameDisplay
        gid={gameId}
        details={details}
        stores={stores}
        uid={userUID}
        userRole={role || "guest"}
        wishlist={wishlist}
      />
    );
  } catch (error) {
    console.error("Error fetching game data:", error);
  }
}

function redirectToErrorPage(username: string) {
  return (
    <meta
      httpEquiv="refresh"
      content={`0;url=/users/${username}/games/error`}
    />
  );
}
