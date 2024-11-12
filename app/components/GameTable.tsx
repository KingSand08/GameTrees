import React from "react";

const GameTable = () => {
  // Mock data for the table rows
  const prices = [
    { store: "Fanatical", platform: "Steam", lowPrice: "$22.49", discount: "-40%", currentPrice: "$29.99" },
    { store: "GamesPlanet US", platform: "Steam", lowPrice: "$26.99", discount: "-36%", currentPrice: "$31.99" },
    { store: "IndieGala Store", platform: "Steam", lowPrice: "$26.88", discount: "-46%", currentPrice: "$32.68" },
    { store: "GamesPlanet FR", platform: "Steam", lowPrice: "$28.70", discount: "-36%", currentPrice: "$34.80" },
    { store: "Humble Store", platform: "Epic, Steam", lowPrice: "$29.99", discount: "-35%", currentPrice: "$38.99" },

  ];

  return (
    <div className="p-8 bg-base-100 text-gray-100">
      {/* Filters */}
      <div className="flex items-center space-x-4 mb-4">
        <span className="text-lg font-semibold">FILTERS:</span>
        <select className="select select-bordered max-w-xs">
          <option>Platforms: Any</option>
          <option>Steam</option>
          <option>Epic</option>
        </select>
        <select className="select select-bordered max-w-xs">
          <option>DRM: Any</option>
          <option>Steam</option>
          <option>Epic</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full bg-neutral-800">
          <thead>
            <tr>
              <th>Store</th>
              <th>Platform</th>
              <th>Store Low</th>
              <th>Discount</th>
              <th>Current Price</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((item, index) => (
              <tr key={index} className="hover:bg-neutral-700">
                <td className="font-semibold">{item.store}</td>
                <td>{item.platform}</td>
                <td className="text-yellow-400">{item.lowPrice}</td>
                <td className="text-blue-400">{item.discount}</td>
                <td>{item.currentPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameTable;
