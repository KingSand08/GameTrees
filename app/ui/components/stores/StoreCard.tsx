import React from "react";

type StoreCardProps = {
    name: string;
    address: string;
    opsDays: string;
    opsHours: string;
    modality: string;
};

const StoreCard: React.FC<StoreCardProps> = ({ name, address, opsDays, opsHours, modality }) => {
    return (
        <div className="card bg-base-200 w-96 shadow-2xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>
                    <strong>Address:</strong> {address}
                </p>
                <p>
                    <strong>Operating Days:</strong> {opsDays}
                </p>
                <p>
                    <strong>Operating Hours:</strong> {opsHours}
                </p>
                <p>
                    <strong>Modality:</strong> {modality}
                </p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default StoreCard;
