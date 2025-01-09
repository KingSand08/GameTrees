import React from "react";
import GameRow from "@/types/models/GameRow";

type GameTableProps = {
    games: GameRow[];
};

const GameTable: React.FC<GameTableProps> = ({ games }) => {
    return (
        <div className="overflow-x-auto bg-neutral rounded-md">
            <table className="table w-full">
                {/* Table Header */}
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Platforms</th>
                    </tr>
                </thead>
                {/* Table Body */}
                <tbody>
                    {games.map((game, index) => (
                        <tr key={index} className="hover">
                            <th>{index + 1}</th>
                            <td>{game.title}</td>
                            <td>${game.price}</td>
                            <td>{game.platforms || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GameTable;
