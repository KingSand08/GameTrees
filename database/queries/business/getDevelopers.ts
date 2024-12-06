import executeQuery from '@/database/mysqldb';
import Business from '@/types/models/Business';

const geDevelopers = async (): Promise<Business[]> => {
    try {
        const getBusinessData = `
            SELECT * FROM Business
            WHERE is_dev = 'Y';
        `;

        const developers = await executeQuery(getBusinessData, []) as Business[];

        return developers;
    } catch (error) {
        console.error("Error Fetching Business on bid:", error);
        return [];
    }
}

export default geDevelopers;