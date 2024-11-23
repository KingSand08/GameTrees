export default interface RawWishlistRow {
    gid: number,
    title: string;
    developer: string;
    image?: Buffer;
    price: number;
}