import { StoreRepository } from "../app/repositories/StoreRepository";
import GameRow from "../types/models/GameRow";

export class StoreService {
    private storeRepository = new StoreRepository();

    public async getGamesByStore(storeId: string): Promise<GameRow[]> {
        return await this.storeRepository.getGamesByStoreId(storeId);
    }
}