export default interface RawStores {
    sid: number;
    name: string;
    modality: string;
    street: string;
    city: string;
    state: string;
    zip: number;
    country: string;
    image?: Buffer;
}