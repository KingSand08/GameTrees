import { useRouter } from "next/navigation";
import GameRow from "@/types/models/GameRow";
import Game from "@/types/models/Game";
import GameDetails from "@/types/models/GameDetails";
import { ArchiveRestore } from 'lucide-react';
import { InventoryEdition } from "@/database/queries/store/InventoryEdition";

interface Props {
    sid: number;
    game: Game | GameRow| GameDetails;
    userRole: string;
    myInventory: Game[] | GameRow[] | GameDetails[];
}


const AddToInvButton = ({sid, game, userRole, myInventory}: Props) => {

    const invFunct = new InventoryEdition;

    return(
        <div className="ml-auto">
            {(userRole == "admin" || userRole == "manager")?
                <button 
                className = "lg:tooltip tooltip-left"
                data-tip={"Add to Inventory"}
                onClick={() => myInventory.map(game => game.gid).includes(game.gid) ? invFunct.addByGid(sid, game.gid) : invFunct.removeByGid(game.gid)}>

                    <ArchiveRestore
                    fill={myInventory.map(game => game.gid).includes(game.gid) ? 'gold' : 'none'}
                    style={{ width: '5em', height: '5em' }}
                    strokeWidth={1}/>
                </button>
                :
                null
            }
        </div>
    )
}

export default AddToInvButton