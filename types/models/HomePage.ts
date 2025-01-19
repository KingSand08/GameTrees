// Store hours for operating days
export interface StoreHours {
    day: string; // e.g., "Monday"
    start_time: string; // e.g., "10:00:00"
    end_time: string; // e.g., "20:00:00"
}

// Store details, including address and modality
export interface Store {
    id: number;
    name: string;
    address: string;
    modality: string;
    city: string;
    hours: StoreHours[];
}

// Game details, including associated store for discounts
export interface Game {
    id: number;
    title: string;
    description: string;
    price: number;
    wishlistCount: number; // For trending games
    discount: number | null; // Best deal percentage
    store?: Store; // Store offering the discount
}
