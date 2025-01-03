// interfaces/RawStoreDetails.ts
export default interface RawStoreDetails {
    name: string;
    modality: string;
    street: string;
    city: string;
    state: string;
    zipCode: number | string;
    country: string;
    image?: Buffer;
}
