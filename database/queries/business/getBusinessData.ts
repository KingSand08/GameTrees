import executeQuery from '@/database/mysqldb';
import Business from '@/types/models/Business';

const getBusinessData = async ({ bid }: { bid: string | number }): Promise<Business | null> => {
    try {
        const getBusinessData = `
            SELECT * FROM Business
            WHERE bid = ?;
        `;

        const foundBusiness = await executeQuery(getBusinessData, [bid]) as Business;

        return foundBusiness;
    } catch (error) {
        console.error("Error Fetching Business on bid:", error);
        return null;
    }
}

export default getBusinessData;