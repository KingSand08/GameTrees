// Interface shows all games in the store inventories
export default interface GameRow {
    gid: number;
    title: string;
    price: number;
    platforms: string;
    image?: string;
    discount: number;
  }
  