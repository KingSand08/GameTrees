// Interface for trending games query
export default interface RawTrendGame {
    gid: number;
    title: string;
    genre: string;
    lowestPrice: number;
    wishlistCount: number;
    image?: Buffer;
  }