"use client";

const gData = [
  { lat: 37, lng: -100, size: 40, color: 'red', id: 'North America' },
  { lat: 51, lng: 20, size: 40, color: 'blue', id: 'Europe' },
  { lat: 10, lng: 26, size: 40, color: 'green', id: 'Africa' },
  { lat: -14, lng: -51, size: 40, color: 'yellow', id: 'South America' },
  { lat: 35, lng: 100, size: 40, color: 'purple', id: 'Asia' },
  { lat: -25, lng: 133, size: 40, color: 'orange', id: 'Australia' },
  { lat: -92, lng: -63, size: 40, color: 'pink', id: 'Antarctica' }
];
const markerSvg = `<svg viewBox="-4 0 36 36">
      <path fill="currentColor" d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z"></path>
      <circle fill="black" cx="14" cy="14" r="7"></circle>
    </svg>`;

import { useEffect, useRef } from 'react';
import Globe, { GlobeMethods } from 'react-globe.gl';
const World = () => {
  const globeEl = useRef<GlobeMethods>(null);

  useEffect(() => {
    const globe = globeEl.current;
    if (!globe) return;
    // Auto-rotate
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.35;
  }, []);

  return <Globe
    ref={globeEl as any}
    globeImageUrl="/earth-blue-marble.jpg"
    backgroundImageUrl={"/night-sky.png"}
    htmlElementsData={gData}
    htmlElement={d => {
      const el = document.createElement('div');
      el.innerHTML = markerSvg;
      // ignore any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      el.style.color = (d as any).color;
      // ignore any
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      el.style.width = `${(d as any).size}px`;
      el.style.pointerEvents = 'auto';
      el.style.cursor = 'pointer';
      el.onclick = () => {
        alert(`Clicked on marker at [${(d as any).lat.toFixed(2)}, ${(d as any).lng.toFixed(2)}, ${(d as any).id}]`);
        // implemetn snapback
        const globe = globeEl.current;
        if (!globe) return;
        globe.controls().autoRotate = false;
        globe.pointOfView({ lat: (d as any).lat, lng: (d as any).lng, altitude: 1.5 }, 1000);

      };
      return el;
    }}

  />;
};

export default World;


// "use client";
// import { useEffect, useRef } from 'react';
// import Globe, { GlobeMethods } from 'react-globe.gl';
// const World = () => {
//   const globeEl = useRef<GlobeMethods>(null);

//   useEffect(() => {
//     const globe = globeEl.current;
//     if (!globe) return;
//     // Auto-rotate
//     globe.controls().autoRotate = true;
//     globe.controls().autoRotateSpeed = 0.35;
//   }, []);

//   return <Globe
//     ref={globeEl as any}
//     animateIn={false}
//     globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
//     bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
//   />;
// };

// export default World;
