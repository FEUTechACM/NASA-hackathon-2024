"use client";

import ExtendedContinentDrawer from "@/components/drawer";
import GlobeWrapper from "@/components/globewrapper";
import SettingsComponent from "@/components/settings";
import { Button } from "@/components/ui/button";
import { useState } from 'react';

export interface Continent {
  id: string;
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
  {
    id: "na",
    name: 'North America', lat: 37, lng: -100, size: 40, color: 'red', images: [
      "/img/north-america/na1.png",
      "/img/north-america/na2.png",
      "/img/north-america/na3.png",
    ], description: `Carbon emissions in North America come from the intensive use of fossil fuels for power generation. The United States, a major player, relies on coal, oil, and natural gas to power its large industrial base. Transmission networks and power stations, such as power plants in the states of West Virginia and Wyoming. A lot of carbon dioxide is released. Currently, the increased use of gasoline and diesel in vehicles across the country is increasing greenhouse gas emissions. Also, industrial activities such as manufacturing and petrochemical production are located in areas such as the Straits of Thailand. It plays an important role in carbon dioxide emissions. Canada's oil sands operations in Alberta emit significant amounts of coal due to the intensive extraction and processing of bitumen.`, story: '', references: [
      "https://www.statista.com/statistics/1224630/cumulative-co2-emissions-united-states-historical/ ",
      "https://www.canada.ca/en/environment-climate-change/services/environmental-indicators/greenhouse-gas-emissions.html",
      "https://www.canada.ca/en/environment-climate-change/news/2024/05/where-canadas-greenhouse-gas-emissions-come-from-2024-national-greenhouse-gas-inventory.html"
    ]
  },
  {
    id: "eu",
    name: 'Europe', lat: 51, lng: 20, size: 40, color: 'blue', images: [
      "/img/europe/eu1.png",
      "/img/europe/eu2.png",
      "/img/europe/eu3.png",
    ], description: `In Europe, most carbon emissions come from energy production, transport, and industrial processes. Countries like Germany and Poland still rely on coal-fired power plants, which are the main source of CO2. An extensive highway network and large numbers of vehicles, particularly in countries such as Italy and France, contribute to transport-related emissions. Industrial regions in countries like Germany, known for their automotive and manufacturing industries, are increasing CO2 emissions. The steel industry in countries such as England and Spain also accounts for a large share of emissions due to the energy required for steel production.`, story: '', references: [
      "https://ourworldindata.org/co2/country/united-kingdom",
      "https://www.gov.uk/government/statistics/uks-carbon-footprint/carbon-footprint-for-the-uk-and-england-to-2019",
      "https://www.statista.com/topics/10972/co2-emissions-in-germany/",
      "https://www.europarl.europa.eu/thinktank/en/document/EPRS_BRI(2021)698766 "
    ]
  },
  {
    id: "africa",
    name: 'Africa', lat: 10, lng: 26, size: 40, color: 'green', images: [
      "/img/africa/africa1.png",
      "/img/africa/africa2.png",
      "/img/africa/africa3.png",
    ], description: `Most of Africa's carbon emissions come from deforestation in the Congo Valley, where large areas of rainforest have been cleared for agriculture and logging. Land use change in Nigeria also contributes to the continent's carbon footprint as land is converted to agriculture and urban development. South Africa's coal-fired power plants also emit large amounts of carbon dioxide, which speaks to the country's dependence on fossil fuels. In contrast, methane emissions come from large livestock farms in Ethiopia, where animals produce methane during digestion. Landfills in Kenya, such as Dandora, release methane as organic waste decomposes. In rural Uganda, burning leaves for cooking is a common practice that adds methane to the atmosphere.`, story: ``, references: [
      "https://data.worldbank.org/indicator/EN.ATM.CO2E.PC?locations=NG",
      "https://data.worldbank.org/indicator/EN.ATM.METH.KT.CE?locations=UG",
      "https://www.ceicdata.com/en/uganda/environmental-gas-emissions-and-air-pollution",
      "https://www.wri.org/insights/congo-basin-deforestation-threatens-food-and-water-supplies-throughout-africa"
    ]
  },
  {
    id: "sa",
    name: 'South America', lat: -14, lng: -51, size: 40, color: 'yellow', images: [
      "/img/south-america/sa1.png",
      "/img/south-america/sa2.png",
      "/img/south-america/sa3.png",
    ], description: `Most of the methane in South America comes from raising livestock, especially cattle, which produce methane during fermentation. Lands and mines also contribute to methane emissions. Measures to control these impacts include improved agriculture, improved waste management, and enhanced methane collection technologies. Countries like Brazil are focusing on raising animals to reduce the impact on the environment.`, story: '', references: [
      "https://egusphere.copernicus.org/preprints/2024/egusphere-2024-1763/",
      "https://www.caf.com/en/knowledge/views/2024/01/beyond-co2-methane-challenges-and-opportunities-in-latin-america-and-the-caribbean/",
      "https://www.fao.org/in-action/enteric-methane/news-and-events/news-detail/cutting-livestock-methane-emissions-for-stronger-climate-action/en",
      "https://borgenproject.org/sustainable-farming-practices-in-latin-america/"
    ]
  },
  {
    id: "asia",
    name: 'Asia', lat: 35, lng: 100, size: 40, color: 'purple', images: [
      "/img/asia/asia1.png",
      "/img/asia/asia2.png",
      "/img/asia/asia3.png",
    ], description: `The Asia-Pacific region, which includes major countries such as China and India, is the world's largest emitter of carbon dioxide. This is due to rapid industrialization, increasing use of coal for electricity generation, and the development of the transportation industry. Urbanization and rising energy demand contribute greatly to carbon emissions in the region. However, much has been done for green innovation, such as investment in renewable energy sources and stricter environmental regulations. Countries in the area also invest in technological innovation to reduce emissions and mitigate climate change.`, story: '', references: [
      "https://www.iea.org/data-and-statistics/charts/co2-emissions-in-southeast-asia-in-the-stated-policies-and-sustainable-development-scenarios-2020-2050",
      "https://www.iea.org/regions/asia-pacific/emissions",
      "https://www.sciencedirect.com/science/article/pii/S2211467X24002396",
      "https://www.sciencedirect.com/science/article/pii/S2211467X22000396",
      "https://www.sciencedirect.com/science/article/abs/pii/S1364032115002257"
    ]
  },
  {
    id: "aus",
    name: 'Australia', lat: -25, lng: 133, size: 40, color: 'orange', images: [
      "/img/australia/aus1.png",
      "/img/australia/aus2.png",
      "/img/australia/aus3.png",
    ], description: `As a continent, Australia faces significant challenges in carbon emissions, mainly due to the burning of fossil fuels for energy and transport and deforestation. The large coal industry plays an important role, where coal-fired power plants generate electricity, leading to high CO2 emissions. In addition, Australia's mining sector, which produces coal, iron ore and other minerals, contributes to carbon emissions through the use of heavy machinery and transport. Deforestation caused by the expansion of agriculture, especially animal husbandry, increases the ecological footprint. The logging industry also plays a role in the conversion of forests to timber.`, story: '', references: [
      "https://australiainstitute.org.au/initiative/coal-mine-tracker/",
      "https://academic.oup.com/jpe/article/5/1/109/1294916 "
    ]
  },
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
    <main className="w-full">
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