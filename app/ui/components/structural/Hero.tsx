import Link from "next/link";
import Image from "next/image";
import { SeparateStoresRep } from "@/database/queries/store/SeparateStores";

const storeRep = new SeparateStoresRep();
const stores = await storeRep.getBayAreaStores();

export default function HighlightStores() {
  return (
    <>
      {/* Carousel Section */}
      <div className="carousel w-full">
        {stores.map((store, index) => (
          <div
            key={store.id}
            id={`item${index + 1}`}
            className="carousel-item w-full"
          >
            <div className="hero bg-base-200 py-16 flex flex-col items-center justify-center">
              
              <div className="hero-content text-base-content flex-col lg:flex-row gap-8">
                <Image
                  src={store.image as string}
                  alt={store.name}
                  width={700}
                  height={500}
                  quality={100}
                  className="rounded-lg shadow-2xl max-w-full h-auto"
                />
                <div>
                  <h1 className="text-4xl font-bold">{store.name}</h1>
                  <p className="text-lg py-4"><strong>Modality: </strong>{store.modality}</p>
                  <p className="text-lg py-4"><strong>Modality: </strong>{store.address}</p>                
                  <h6 className="text-lg py-4">
                    <strong>Operating Hours:</strong>
                    {store.hours.length > 0 ? (
                      <ul>
                        {store.hours.map((hour, index) => (
                          <li key={index}>
                            {hour.day}: {hour.startTime ? hour.startTime : "N/A"} - {hour.endTime ? hour.endTime : "N/A"}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span> Not available</span>
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
      <div className="flex w-full justify-center gap-2 py-4">
        {stores.map((_, index) => (
          <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>
    </>
  );
}
