import executeQuery from "@/database/mysqldb";
import ImageRow from "@/types/models/ImageRow";
import blobToBase64 from "@/utils/blobToBase64";
import RawImageRow from "@/types/models/RawImageRow"

export class StoreImages {
    // Returns a Promise containing an array of ImageRow type
    public async getStoreImages(storeId: string): Promise<ImageRow[]> {
        const query = `
            SELECT
                P.spid AS photoId,
                P.image
            FROM storePhotos P
            WHERE P.sid = ?;
            `;
        const results = await executeQuery(query, [storeId]) as RawImageRow[];

        if (!Array.isArray(results)) {
            throw new Error("Invalid format");
        }

        const processedResults: ImageRow[] = results.map((result) => ({
            ...result,
            image: result.image ? blobToBase64(result.image) : undefined,
        }));
        return processedResults;
    }
}