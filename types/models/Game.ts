export default interface Game {
  gid: number;
  title: string;
  description: string;
  did: string;
  price: number;
  publish_date: string;
  image?: string | null;
  developer?: string | null;
}