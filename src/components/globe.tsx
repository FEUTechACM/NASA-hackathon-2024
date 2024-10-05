// "use client";

// import { useEffect, useRef } from 'react';
// import Globe, { GlobeMethods } from 'react-globe.gl';
// // import { Continent } from './page'; // Adjust the import path as needed
// import { Continent } from '@/app/page';
// interface WorldProps {
//     onSelectContinent: (continent: Continent) => void;
//     selectedContinent: Continent | null;
// }

// const gData: Continent[] = [
//     { name: 'North America', lat: 37, lng: -100, size: 40, color: 'red', images: [], description: '', story: '', references: [] },
//     { name: 'Europe', lat: 51, lng: 20, size: 40, color: 'blue', images: [], description: '', story: '', references: [] },
//     { name: 'Africa', lat: 10, lng: 26, size: 40, color: 'green', images: [], description: '', story: '', references: [] },
//     { name: 'South America', lat: -14, lng: -51, size: 40, color: 'yellow', images: [], description: '', story: '', references: [] },
//     { name: 'Asia', lat: 35, lng: 100, size: 40, color: 'purple', images: [], description: '', story: '', references: [] },
//     { name: 'Australia', lat: -25, lng: 133, size: 40, color: 'orange', images: [], description: '', story: '', references: [] },
//     { name: 'Antarctica', lat: -92, lng: -63, size: 40, color: 'pink', images: [], description: '', story: '', references: [] }
// ];

// const markerSvg = `<svg viewBox="-4 0 36 36">
//   <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
//   <circle fill="black" cx="14" cy="14" r="7"></circle>
// </svg>`;

// const World: React.FC<WorldProps> = ({ onSelectContinent, selectedContinent }) => {
//     const globeEl = useRef<GlobeMethods>(null);

//     useEffect(() => {
//         const globe = globeEl.current;
//         if (!globe) return;
//         globe.controls().autoRotate = true;
//         globe.controls().autoRotateSpeed = 0.35;
//     }, []);

//     useEffect(() => {
//         if (selectedContinent && globeEl.current) {
//             globeEl.current.pointOfView({ lat: selectedContinent.lat, lng: selectedContinent.lng, altitude: 1.5 }, 1000);
//             globeEl.current.controls().autoRotate = false;
//         } else if (globeEl.current) {
//             globeEl.current.controls().autoRotate = true;
//         }
//     }, [selectedContinent]);

//     return (
//         <Globe
//             ref={globeEl as any}
//             globeImageUrl="/earth-blue-marble.jpg"
//             backgroundImageUrl="/night-sky.png"
//             htmlElementsData={gData}
//             htmlElement={d => {
//                 const el = document.createElement('div');
//                 el.innerHTML = markerSvg;
//                 el.style.color = (d as any).color;
//                 el.style.width = `30px`;
//                 el.style.pointerEvents = 'auto';
//                 el.style.cursor = 'pointer';
//                 el.onclick = () => onSelectContinent(d as Continent);
//                 return el;
//             }}
//         />
//     );
// };

// export default World;

"use client";

import { useEffect, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
// import { Continent } from './page'; // Adjust the import path as needed
import { Continent } from '@/app/page';

interface WorldProps {
    continents: Continent[];
    onSelectContinent: (continent: Continent) => void;
    selectedContinent: Continent | null;
}

const markerSvg = `<svg viewBox="-4 0 36 36">
  <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
  <circle fill="black" cx="14" cy="14" r="7"></circle>
</svg>`;

const World: React.FC<WorldProps> = ({ continents, onSelectContinent, selectedContinent }) => {
    const globeEl = useRef<GlobeMethods>(null);

    useEffect(() => {
        const globe = globeEl.current;
        if (!globe) return;
        globe.controls().autoRotate = true;
        globe.controls().autoRotateSpeed = 0.35;
    }, []);

    useEffect(() => {
        if (selectedContinent && globeEl.current) {
            globeEl.current.pointOfView({ lat: selectedContinent.lat, lng: selectedContinent.lng, altitude: 1.5 }, 1000);
            globeEl.current.controls().autoRotate = false;
        } else if (globeEl.current) {
            globeEl.current.controls().autoRotate = true;
        }
    }, [selectedContinent]);

    return (
        <Globe
            ref={globeEl as any}
            globeImageUrl="/earth-blue-marble.jpg"
            backgroundImageUrl="/night-sky.png"
            htmlElementsData={continents}
            htmlElement={d => {
                const el = document.createElement('div');
                el.innerHTML = markerSvg;
                el.style.color = (d as any).color;
                el.style.width = `40px`;
                el.style.pointerEvents = 'auto';
                el.style.cursor = 'pointer';
                el.onclick = () => onSelectContinent(d as Continent);
                return el;
            }}
        />
    );
};

export default World;