import { useRouter } from "next/navigation";
import GameRow from "@/types/models/GameRow";
import Game from "@/types/models/Game";
import { usePathname } from 'next/navigation';
import { Star } from 'lucide-react';
import WishlistRow from "@/types/models/WishlistRow";

interface Props {
    uid: number | string | null;
    game: Game | GameRow | WishlistRow;
    userRole: string;
    myWishlist: WishlistRow[];
}


const WishListButton = ({uid, game, userRole, myWishlist}: Props) => { //maybe make myWishList optionl?
    const router = useRouter();
    const pathname = usePathname();

    const redirectToErrorPage = () => {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }
        
    const isGameInWishlist = myWishlist.some((someWishlistRow:WishlistRow) => someWishlistRow.gid === game.gid);

    //is uid needed here?
    const handleAddToWishlist = async (uid: number | string, gid: number) => {
    try {
        const response = await fetch("/api/wishlist/addTo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ uid, gid }),
        });
        router.refresh();
        if (!response.ok) {
            const data = await response.json();
            console.error("Failed to add game:", data.message);
        }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    }

    const handleRemoveFromWishlist = async (uid:number | string, gid: number) => {
        try {
            await fetch("/api/wishlist/removeFrom", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, gid }),
            });

            router.refresh();
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    return (
        <div className="ml-auto">
            {(userRole != "admin" && userRole != "manager")?
                <button className = "lg:tooltip tooltip-left"
                data-tip={
                    !uid ? "Log in to wishlist" : null
                }
                onClick={() => uid? 
                    isGameInWishlist?
                        handleRemoveFromWishlist(uid, game.gid) :
                        handleAddToWishlist(uid, game.gid)
                    : redirectToErrorPage()}
                >
                    <Star
                    fill={isGameInWishlist ? 'gold' : 'none'}
                    style={{ width: '5em', height: '5em' }}
                    strokeWidth={1}
                    />
                </button>
                :
                null
            }
        </div>
    )
}

export default WishListButton