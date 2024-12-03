// Interface shows all stores that sell a specified game
export default interface StoreRow {
    store_id: number,
    store_name: string;
    address: string;
    discount: number;
    price: number;
  }
  