export default interface Business {
    bid: number;
    name: string;
    is_pc: string;
    is_dev: string;
    is_pub: string;
    street: string;
    city: string | null;
    state: string | null;
    zip: string | null;
    country: string | null;
}