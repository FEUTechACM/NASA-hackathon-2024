"use client";

import ExtendedContinentDrawer from "@/components/drawer";
import GlobeWrapper from "@/components/globewrapper";
import SettingsComponent from "@/components/settings";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

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
  { name: 'North America', lat: 37, lng: -100, size: 40, color: 'red', images: [], description: `Carbon emissions in North America come from the intensive use of fossil fuels for power generation. The United States, a major player, relies on coal, oil, and natural gas to power its large industrial base. Transmission networks and power stations, such as power plants in the states of West Virginia and Wyoming. A lot of carbon dioxide is released. Currently, the increased use of gasoline and diesel in vehicles across the country is increasing greenhouse gas emissions. Also, industrial activities such as manufacturing and petrochemical production are located in areas such as the Straits of Thailand. It plays an important role in carbon dioxide emissions. Canada's oil sands operations in Alberta emit significant amounts of coal due to the intensive extraction and processing of bitumen.`, story: '', references: [] },
  { name: 'Europe', lat: 51, lng: 20, size: 40, color: 'blue', images: [], description: `In Europe, most carbon emissions come from energy production, transport, and industrial processes. Countries like Germany and Poland still rely on coal-fired power plants, which are the main source of CO2. An extensive highway network and large numbers of vehicles, particularly in countries such as Italy and France, contribute to transport-related emissions. Industrial regions in countries like Germany, known for their automotive and manufacturing industries, are increasing CO2 emissions. The steel industry in countries such as England and Spain also accounts for a large share of emissions due to the energy required for steel production.`, story: '', references: [] },
  { name: 'Africa', lat: 10, lng: 26, size: 40, color: 'green', images: [], description: '', story: `Most of Africa's carbon emissions come from deforestation in the Congo Valley, where large areas of rainforest have been cleared for agriculture and logging. Land use change in Nigeria also contributes to the continent's carbon footprint as land is converted to agriculture and urban development. South Africa's coal-fired power plants also emit large amounts of carbon dioxide, which speaks to the country's dependence on fossil fuels. In contrast, methane emissions come from large livestock farms in Ethiopia, where animals produce methane during digestion. Landfills in Kenya, such as Dandora, release methane as organic waste decomposes. In rural Uganda, burning leaves for cooking is a common practice that adds methane to the atmosphere.`, references: [] },
  { name: 'South America', lat: -14, lng: -51, size: 40, color: 'yellow', images: [], description: `Most of the methane in South America comes from raising livestock, especially cattle, which produce methane during fermentation. Lands and mines also contribute to methane emissions. Measures to control these impacts include improved agriculture, improved waste management, and enhanced methane collection technologies. Countries like Brazil are focusing on raising animals to reduce the impact on the environment.`, story: '', references: [] },
  { name: 'Asia', lat: 35, lng: 100, size: 40, color: 'purple', images: [], description: `The Asia-Pacific region, which includes major countries such as China and India, is the world's largest emitter of carbon dioxide. This is due to rapid industrialization, increasing use of coal for electricity generation, and the development of the transportation industry. Urbanization and rising energy demand contribute greatly to carbon emissions in the region. However, much has been done for green innovation, such as investment in renewable energy sources and stricter environmental regulations. Countries in the area also invest in technological innovation to reduce emissions and mitigate climate change.`, story: '', references: [] },
  { name: 'Australia', lat: -25, lng: 133, size: 40, color: 'orange', images: [], description: `As a continent, Australia faces significant challenges in carbon emissions, mainly due to the burning of fossil fuels for energy and transport and deforestation. The large coal industry plays an important role, where coal-fired power plants generate electricity, leading to high CO2 emissions. In addition, Australia's mining sector, which produces coal, iron ore and other minerals, contributes to carbon emissions through the use of heavy machinery and transport. Deforestation caused by the expansion of agriculture, especially animal husbandry, increases the ecological footprint. The logging industry also plays a role in the conversion of forests to timber.`, story: '', references: [] },
];

const Page = () => {
  const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
  const [clickedContinents, setClickedContinents] = useState<{ [key: string]: boolean; }>({});

  const handleContinentSelect = (continent: Continent) => {
    setClickedContinents(prev => ({ ...prev, [continent.name]: true }));
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
      <div className="fixed inset-x-0 z-40 bottom-0 p-1 sm:p-2 bg-transparent">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-2 max-w-3xl mx-auto">
          {continents.map((continent) => (
            <Button
              key={continent.name}
              variant="outline"
              onClick={() => handleContinentSelect(continent)}
              className={`${clickedContinents[continent.name] ? "bg-green-500 hover:bg-green-600 text-white" : ""}`}            >
              {continent.name}
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Page;