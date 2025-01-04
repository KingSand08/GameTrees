// interfaces/StoreDetails.ts
export default interface StoreDetails {
    name: string;
    modality: string;
    street: string;
    city: string;
    state: string;
    zipCode: number | string;
    country: string;
}
