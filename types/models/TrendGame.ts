// Interface for trending games query
export default interface TrendGame {
    gid: number;
    title: string;
    genre: string;
    lowestPrice: number;
    wishlistCount: number;
    image?: string | null;
  }