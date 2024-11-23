// import Link from "next/link";
import Image from "next/image";

// Mock data for highlighted stores
const stores = [
  { id: 1, title: "Gameshop Downstairs", thumbnail: "https://lh3.googleusercontent.com/p/AF1QipObR828KFvijsnRtLidRjCu4d9j0DOzxFPX_-j1=s680-w680-h510", description: "Downtown San Jose's retro gaming paradise.We specializing in retro video games, TCGs, and Japanese imports. We Buy, Sell, and Trade for store credit and cash!" },
  { id: 2, title: "Game Kastle", thumbnail: "https://gamekastle.com/cdn/shop/files/SantaCPlay8_1080x.jpg?v=1696378447", description: "We’ve got one of the largest selections of gaming products in the area, from classic to esoteric. A large portion of our store is devoted to a wide range of board games, from war scenarios to artsy thematic puzzlers, and everything in between. We have a massive amount of RPGs, including independent and small press games." },
  { id: 3, title: "Game World", thumbnail: "https://lh3.googleusercontent.com/p/AF1QipMeEYKe-_dym5-Bdd5--zuufX8Jm1N4Ecesz_KD=s680-w680-h510", description: '"Small place, had some good stuff a little to pricy for my budget. Pretty decent prices and a good selection of whatever you might be looking for. Will come back because customer service was good.' },
  { id: 4, title: "Retro Rewind", thumbnail: "https://lh3.googleusercontent.com/p/AF1QipOjsY_kcd5xBAP3ZioaLAgelVWxnL6F7dYJqK9V=s680-w680-h510", description: "Open 7 Day a week: 11AM - 7PM We Buy Games / Collections / Sports Cards" },
];

export default function HighlightGameCards() {
  return (
    <>
      <div className="carousel w-full">
        {stores.map((store, index) => (
          <div key={store.id} id={`item${index + 1}`} className="carousel-item w-full">
            <div className="hero bg-base-200 h-[50vh]">
              <div className="hero-content text-base-content flex-col lg:flex-row">
                <Image
                  src={store.thumbnail}
                  alt={store.title}
                  width={750}
                  height={1000}
                  quality={100}
                  className="max-w-md rounded-lg shadow-2xl"
                />
                <div>
                  <h1 className="text-5xl font-bold">{store.title}</h1>
                  <p className="text-lg py-6">{store.description}</p>
                  <button className="btn btn-primary">Visit Store</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {stores.map((_, index) => (
          <a key={index} href={`#item${index + 1}`} className="btn btn-xs">
            {index + 1}
          </a>
        ))}
      </div>
    </>
  );
}