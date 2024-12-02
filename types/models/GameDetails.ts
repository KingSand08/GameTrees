// Interface shows details of a specified game
export default interface GameDetails {
    gid: number;
    title: string;
    description: string;
    developer: string;
    price: number;
    publish_date: Date;
    image?: string;
  }
  