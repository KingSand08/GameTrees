"use client"

import Link from "next/link";
import Image from "next/image";
import StoreHours from "@/types/models/StoreHours";

export type HighlightStore = {
  id: number,
  name: string,
  address: string,
  modality: string,
  city: string,
  hours: StoreHours[]
  image?: string,
}

type HighlightStoresProps = {
  stores: HighlightStore[];
};

const HighlightStores: React.FC<HighlightStoresProps> =({stores}) => {
  return (
    <div className="flex flex-col space-y-5">
      {/* Carousel Section */}
      <div className="carousel w-full">
        {stores.map((store, index) => (
          <div
            key={store.id}
            id={`item${index + 1}`}
            className="carousel-item w-full"
          >
            <div className="hero flex flex-col items-center justify-center">

              <div className="hero-content text-base-content flex-col lg:flex-row gap-8">
                <Image
                  src={store.image as string}
                  alt={store.name}
                  width={700}
                  height={500}
                  quality={100}
                  style={{
                    objectFit: 'cover', // Ensures the image is cropped to fill the container
                    width: '700px',
                    height: '500px',
                  }}
                  className="rounded-lg shadow-2xl"
                />
                <div>
                  <h1 className="text-4xl font-bold">{store.name}</h1>
                  <p className="text-lg text-base-content"><strong>Address: </strong>{store.address}</p>
                  <p className="text-lg text-base-content"><strong>Modality: </strong>{store.modality}</p>
                  <h6 className="text-lg py-5">
                    <strong>Operating Hours:</strong>
                    {store.hours.length === 0 ? (
                      <p className="text-center">No operating hours available.</p>
                    ) : (
                      <table className="table table-sm bg-base-100 text-base-content max-w-96 rounded-md">
                        <thead>
                          <tr>
                            <th className="text-left">Weekday</th>
                            <th className="text-left">Open</th>
                            <th className="text-left">Close</th>
                          </tr>
                        </thead>
                        <tbody>
                          {store.hours.map((hour, index) => (
                            <tr key={index}>
                              <td className="font-bold">{hour.day}:</td>
                              <td>{hour.start_time}</td>
                              <td>{hour.end_time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </h6>
                  <Link href={`/store/${store.id}`}>
                    <button className="btn btn-primary">Visit Store</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Carousel Navigation */}
      <div className="flex w-full justify-center gap-2">
        {stores.map((_, index) => (
          <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>
    </div>
  );
}

export default HighlightStores;