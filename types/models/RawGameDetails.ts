// Interface shows details of a specified game
export default interface RawGameDetails {
    gid: number;
    title: string;
    description: string;
    developer: string;
    price: number;
    publish_date: Date;
    image?: Buffer;
  }
  