"use client";

import { Html, OrbitControls, PerspectiveCamera, useTexture } from '@react-three/drei';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Update the marker data type
type Marker = {
    position: [number, number, number];  // Explicitly define as tuple
    note: string;
    image: string;
    story: string;
};

// Define the marker data with the correct type
const markers: Marker[] = [
    { position: [0, 0.5, 3], note: "Southeast Asia", image: "/placeholder.svg?height=200&width=300", story: "The Asia-Pacific region, which includes major countries such as China and India, is the world's largest emitter of carbon dioxide. This is due to rapid industrialization, increasing use of coal for electricity generation, and the development of the transportation industry. Urbanization and rising energy demand contribute greatly to carbon emissions in the region. However, much has been done for green innovation, such as investment in renewable energy sources and stricter environmental regulations. Countries in the area also invest in technological innovation to reduce emissions and mitigate climate change." },
    { position: [-1, 0.5, 0], note: "China", image: "/placeholder.svg?height=200&width=300", story: "In China, rapid industrialization sweeps the nation into a haze of carbon emissions. Coal-fired power plants breathe life into factories and homes, as cities stretch and transportation hums. The relentless rise in energy demands paints the skies with layers of CO2. This is the tale of a land intertwined with its quest for progress." },
    { position: [-4, 0.5, 0], note: "India and Pakistan", image: "/placeholder.svg?height=200&width=300", story: "In Southeast Asia, the tale of carbon emissions is deeply tied to transportation. As cities expand and economies grow, roads become crowded with cars, trucks, and motorcycles. The constant hum of engines and the plume of exhaust create a dense tapestry of air pollution. This vibrant region's struggle is to balance rapid development with the need to reduce transportation emissions, weaving a narrative of progress intertwined with environmental consciousness." },
    { position: [-8, 0.5, 1.2], note: "Saudi Arabia", image: "/placeholder.svg?height=200&width=300", story: "In Saudi Arabia, oil flows through the veins of the nation, fueling an energy sector that powers industries and transports dreams. Vast reserves drive carbon emissions skyward as cities rise and energy needs swell. The deserts echo with the whispers of carbon, marking a land steeped in its fossil fuel legacy. This is the saga of an oil-rich kingdom's environment" },
];

interface MarkerProps {
    position: [number, number, number];
    note: string;
    story: string;
    image: string;
    setSelectedMarker: (info: HoverInfo | null) => void;
}

function Marker({ position, note, image, setSelectedMarker, story }: MarkerProps) {
    const ref = useRef<THREE.Mesh>(null);

    return (
        <mesh
            ref={ref}
            position={position}
            onClick={() => setSelectedMarker({ note, image, story })}
        >
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial color="red" emissive="red" emissiveIntensity={0.5} />
        </mesh>
    );
}

interface HoverInfo {
    note: string;
    image: string;
    story: string;
}


function Background() {
    const texture = useTexture('/img/smoke.png');
    const { scene } = useThree();

    useEffect(() => {
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        const material = new THREE.MeshBasicMaterial({
            map: texture as THREE.Texture
        });


        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh as any);

        return () => {
            scene.remove(mesh as any);
            geometry.dispose();
            material.dispose();
        };
    }, [scene, texture]);

    return null;
}

function IsometricMap() {
    const [mapSize] = useState({ width: 19.20, height: 10.80 });
    const [selectedMarker, setSelectedMarker] = useState<HoverInfo | null>(null);
    const texture = useLoader(THREE.TextureLoader, '/map/asia.png');

    const { camera } = useThree();

    useEffect(() => {
        camera.position.set(8, 8, 8);
        camera.lookAt(0, 0, 0);
    }, [camera]);

    return (
        <>
            <Background />
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <boxGeometry args={[mapSize.width, mapSize.height, 0.5]} />
                <meshStandardMaterial map={texture} />
            </mesh>
            {markers.map((marker, index) => (
                <Marker key={index} {...marker} setSelectedMarker={setSelectedMarker} />
            ))}
            {selectedMarker && (
                <Html fullscreen>
                    <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white p-4 rounded-lg">
                        <h2 className="text-xl mb-2 font-bold">{selectedMarker.note}</h2>
                        <p>{selectedMarker.story}</p>
                        <button
                            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                            onClick={() => setSelectedMarker(null)}
                        >
                            Close
                        </button>
                    </div>
                </Html>
            )}
            <button>Hello World</button>
        </>
    );
}

export default function MapComponent() {
    return (
        <div className="w-full h-screen bg-white">
            <Canvas shadows>
                <PerspectiveCamera makeDefault fov={75} position={[0, 0, 10]} />
                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[5, 5, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize-width={1920}
                    shadow-mapSize-height={1080}
                />
                <IsometricMap />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
        </div>
    );
}