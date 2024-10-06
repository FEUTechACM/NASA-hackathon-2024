"use client";

import { useState } from 'react';
import ExtendedContinentDrawer from "@/components/drawer";
import SettingsComponent from "@/components/settings";
import { Button } from "@/components/ui/button";
import GlobeWrapper from "@/components/globewrapper";

export interface Continent {
  name: string;
  lat: number;
  lng: number;
  size: number;
  color: string;
  images: string[];
  description: string;
  story: string;
  references: string[];
}

const continents: Continent[] = [
  { name: 'North America', lat: 37, lng: -100, size: 40, color: 'red', images: [], description: '', story: '', references: [] },
  { name: 'Europe', lat: 51, lng: 20, size: 40, color: 'blue', images: [], description: '', story: '', references: [] },
  { name: 'Africa', lat: 10, lng: 26, size: 40, color: 'green', images: [], description: '', story: '', references: [] },
  { name: 'South America', lat: -14, lng: -51, size: 40, color: 'yellow', images: [], description: '', story: '', references: [] },
  { name: 'Asia', lat: 35, lng: 100, size: 40, color: 'purple', images: [], description: '', story: '', references: [] },
  { name: 'Australia', lat: -25, lng: 133, size: 40, color: 'orange', images: [], description: '', story: '', references: [] },
  { name: 'Antarctica', lat: -90, lng: -62, size: 40, color: 'pink', images: [], description: '', story: '', references: [] }
];

const Page = () => {
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);

  const handleContinentSelect = (continent: Continent) => {
    setSelectedContinent(prevContinent =>
      prevContinent?.name === continent.name ? null : continent
    );
  };

  return (
    <main>
      <SettingsComponent />
      <GlobeWrapper
        continents={continents}
        onSelectContinent={handleContinentSelect}
        selectedContinent={selectedContinent}
      />
      <ExtendedContinentDrawer
        selectedContinent={selectedContinent}
        onClose={() => setSelectedContinent(null)}
      />
      <div className="fixed inset-x-0 bottom-0 p-1 sm:p-2 bg-transparent">
        <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 max-w-3xl mx-auto">
          {continents.map((continent) => (
            <Button
              key={continent.name}
              variant="outline"
              onClick={() => handleContinentSelect(continent)}
              className={`${selectedContinent?.name === continent.name ? "bg-green-500 hover:bg-green-600 text-white" : ""}`}
            >
              {continent.name}
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;