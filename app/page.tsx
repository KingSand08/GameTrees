"use client";

import React, { useEffect, useState } from "react";
import HighlightGameCards from "./ui/components/structural/Hero";
import ScrollSection from "./ui/components/structural/ScrollSection";
import GameTable from "./ui/components/structural/GameTable";
import StoresList from "./ui/components/stores/StoresList";
import GameDiscounts from "./ui/components/games/GameDiscounts";

type Store = {
  sid: number;
  name: string;
  address: string;
  opsDays: string;
  opsHours: string;
  modality: string;
  discount: string;
};

export type StoreInfo = {
  sid: number;
  storeName: string;
  address: string;
  opsDays: string;
  opsHours: string;
  discount: number;
};

type GameData = {
  gid: number;
  title: string;
  price: number;
  stores: StoreInfo[];
};

export default function Home() {
  const [bayAreaStores, setBayAreaStores] = useState<Store[]>([]);
  const [nonBayAreaStores, setNonBayAreaStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [games, setGames] = useState<GameData[]>([]);


  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch("/api/separatestores");
        if (!response.ok) {
          throw new Error("Failed to fetch stores");
        }
        const data = await response.json();
        setBayAreaStores(data.bayAreaStores || []);
        setNonBayAreaStores(data.nonBayAreaStores || []);
      } catch (err) {
        setError("Error loading store data");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  useEffect(() => {
    const fetchGames = async () => {
        try {
            const response = await fetch("/api/discountgames");
            if (!response.ok) {
                throw new Error("Failed to fetch discounted games.");
            }
            const data = await response.json();
            setGames(data);
        } catch (err) {
            setError("Error loading discounted games.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchGames();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading stores...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 text-gray-100 space-y-12">
      <HighlightGameCards />
      <StoresList stores={bayAreaStores} title="Bay Area Stores" />
      <StoresList stores={nonBayAreaStores} title="Stores Outside the Bay Area" />
      <div className="p-6 space-y-12">
            {/* Discounted Games Section */}
            <GameDiscounts games={games} />
        </div>
    </div>
  );
}
