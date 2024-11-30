import React from "react";

type Store = {
    sid: number;
    storeName: string;
    address: string;
    discount: number;
};

type GameData = {
    gid: number;
    title: string;
    price: number;
    stores: Store[];
};

type GameDiscountsProps = {
    games: GameData[];
};

const GameDiscounts: React.FC<GameDiscountsProps> = ({ games }) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Discounted Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {games.map((game) => (
                    <div
                        key={game.gid}
                        className="card bg-base-100 shadow-xl p-4"
                    >
                        <h3 className="text-xl font-bold">{game.title}</h3>
                        <p className="text-gray-500">Price: ${game.price.toFixed(2)}</p>
                        <ul className="mt-2">
                            {game.stores.map((store) => (
                                <li
                                    key={store.sid}
                                    className="text-sm border-b border-gray-200 pb-2 mb-2"
                                >
                                    <strong>{store.storeName}</strong> -{" "}
                                    <span>
                                        {store.discount > 0
                                            ? `${(store.discount * 100).toFixed(
                                                  0
                                              )}% off`
                                            : "No discount"}
                                    </span>
                                    <br />
                                    <span className="text-gray-400">
                                        {store.address}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameDiscounts;
