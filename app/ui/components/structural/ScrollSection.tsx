import React from 'react';

const highlightedStores = [
    { id: 1, title: "Gameshop Downstairs", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 2, title: "Gameworld", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 3, title: "Retro Rewind", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 4, title: "Pixel Play", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 5, title: "Level Up Lounge", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 6, title: "Console Kingdom", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 7, title: "Arcadia", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 8, title: "8-Bit Bazaar", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 9, title: "Joystick Junction", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 10, title: "Gamer's Paradise", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 11, title: "Pixel Emporium", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 12, title: "Virtual Vault", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" },
    { id: 13, title: "Level One Lounge", thumbnail: "https://www.giantbomb.com/a/uploads/scale_small/8/87790/2952214-box_fn.png", description: "Explore the best deals and games!" }
];

export default function ScrollSection() {
  return (
    <section className="space-y-6">
      <h2 className="ml-3 text-2xl font-semibold">
        Trending
      </h2>
      <div className="relative flex items-center">
        <div className="carousel carousel-center bg-base-100 rounded-box max-w-screen space-x-4 p-4">
          {highlightedStores.map((store) => (
            <div key={store.id} className="carousel-item">
              <div className="card card-compact bg-neutral w-96 shadow-xl mx-2">
                <figure>
                  <img
                    src={store.thumbnail}
                    alt={store.title}
                    className="rounded-xl"
                  />
                </figure>
                <div className="card-body items-center text-center">
                  <h2 className="card-title">{store.title}</h2>
                  <p>{store.description}</p>
                  <div className="card-actions">
                    <button className="btn btn-primary">Visit Store</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}