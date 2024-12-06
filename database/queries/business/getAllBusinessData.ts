import executeQuery from '@/database/mysqldb';
import Business from '@/types/models/Business';

const getAllBusinesses = async (): Promise<Business[]> => {
    try {
        const getBusinessesQuery = `
            SELECT * FROM Business;
        `;

        const businesses = await executeQuery(getBusinessesQuery, []) as Business[];

        // console.log(businesses)

        return businesses;
    } catch (error) {
        console.error("Error Fetching Businesses:", error);
        return [];
    }
};

export default getAllBusinesses;
