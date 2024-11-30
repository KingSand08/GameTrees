type Game = {
    title: string;
    description: string;
    price: number;
};

type StoreGamesProps = {
    games: Game[];
};

const StoreGames = ({ games }: StoreGamesProps) => {
    return (
        <div className="store-games">
            <h2 className="text-xl font-bold">Games Available</h2>
            {games.length > 0 ? (
                <ul className="game-list">
                    {games.map((game, index) => (
                        <li key={index} className="border-b py-4">
                            <h3 className="font-semibold">{game.title}</h3>
                            <p>{game.description}</p>
                            <p><strong>Price:</strong> ${game.price.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No games available at this store.</p>
            )}
        </div>
    );
};

export default StoreGames;
