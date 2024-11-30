type StoreDetailProps = {
    opsHour: string;
    address: string;
};

const StoreDetails = ({ opsHour, address }: StoreDetailProps) => {
    return (
        <div className="store-details">
            <h1 className="text-2xl font-bold">Store Details</h1>
            <p><strong>Address:</strong> {address}</p>
            <p><strong>Operating Hours:</strong> {opsHour}</p>
        </div>
    );
};

export default StoreDetails;
