import { useRouter } from "next/navigation";
import GameRow from "@/types/models/GameRow";
import Game from "@/types/models/Game";
import { usePathname } from 'next/navigation';
import { Star } from 'lucide-react';
import Inventory from "@/types/models/Inventory";
import GameDetails from "@/types/models/GameDetails";

interface Props {
    uid: number | string | null;
    game: Game | GameRow | GameDetails;
    userRole: string;
    sid: number | string; 
    inventories: Inventory[];
}


const InventoryButton = ({ uid, game, userRole, sid, inventories }: Props) => { //maybe make mystore optionl?
    const router = useRouter();
    const pathname = usePathname();

    const redirectToErrorPage = () => {
        router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
    }

    const isGameInInventory = inventories.some((someInventoryRow: Inventory) => 
        someInventoryRow.gid === game.gid && someInventoryRow.sid === sid
    );

    const handleAddToInventory = async (sid: number | string, gid: number) => {
        try {
            const response = await fetch("/api/store/addTo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sid, gid }),
            });
            router.refresh();
            if (!response.ok) {
                const data = await response.json();
                console.error("Failed to add game:", data.message);
            }
        } catch (error) {
            console.error("Error adding to store:", error);
        }
    }

    const handleRemoveFromInventory = async (sid: number | string, gid: number) => {
        try {
            await fetch("/api/store/removeFrom", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ uid, gid }),
            });

            router.refresh();
        } catch (error) {
            console.error("Error removing from store:", error);
        }
    };

    return (
        <div className="ml-auto">
            {(userRole === "manager") ?
                <button className="lg:tooltip tooltip-left"
                    data-tip={
                        !uid ? "Log in to store" : null
                    }
                    onClick={() => uid ?
                        isGameInInventory ?
                            handleRemoveFromInventory(sid, game.gid) :
                            handleAddToInventory(sid, game.gid)
                        : redirectToErrorPage()}
                >
                    <Star
                        fill={isGameInInventory ? 'gold' : 'none'}
                        style={{ width: '2.5em', height: '2.5em' }}
                        strokeWidth={1}
                    />
                </button>
                :
                null
            }
        </div>
    )
}

export default InventoryButton