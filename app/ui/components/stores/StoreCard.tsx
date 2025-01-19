import React from "react";

type StoreHours = {
    day: string;
    start_time: string;
    end_time: string;
};

type StoreCardProps = {
    name: string;
    address: string;
    modality: string;
    city: string;
    hours: StoreHours[];
};

const StoreCard: React.FC<StoreCardProps> = ({ name, address, modality, city, hours }) => {
    return (
        <div className="card bg-base-200 w-96 shadow-2xl">
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>
                    <strong>Address:</strong> {address}
                </p>
                <p>
                    <strong>City:</strong> {city}
                </p>
                <p>
                    <strong>Modality:</strong> {modality}
                </p>
                <div>
                    <strong>Hours:</strong>
                    <ul className="list-disc ml-5">
                        {hours.length > 0 ? (
                            hours.map((hour, index) => (
                                <li key={index}>
                                    {hour.day}: {hour.start_time} - {hour.end_time}
                                </li>
                            ))
                        ) : (
                            <li>Hours not available</li>
                        )}
                    </ul>
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">View Details</button>
                </div>
            </div>
        </div>
    );
};

export default StoreCard;
