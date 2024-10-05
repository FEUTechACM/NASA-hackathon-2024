import { Continent } from '@/app/page';
import { useEffect, useRef } from 'react';
import { GlobeMethods } from 'react-globe.gl';

import dynamic from 'next/dynamic';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={globeEl as any}
            globeImageUrl="/earth-blue-marble.jpg"
            backgroundImageUrl="/night-sky.png"
            htmlElementsData={continents}
            htmlElement={d => {
                const el = document.createElement('div');
                el.innerHTML = markerSvg;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
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