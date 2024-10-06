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
    {
        position: [-4.7, 0.5, -1], note: "England", image: "/placeholder.svg?height=200&width=300", story:
            "In the UK, carbon emissions are driven by the industry which puts CO2 clouds into the atmosphere. Cars rumble along the country's roads, with all the sounds of petrol and diesel in the air. Amidst the busy shopping centers and highways, stories of prosperity and filth emerge. Steel and fiberglass work together to paint a complex picture of Britain's environmental struggles. In this story, the carbon footprint leaves its mark on the planet, a beautiful dance of evolution and impact."
    },
    {
        position: [-2, 0.5, 0], note: "Germany", image:
            "/placeholder.svg?height=200&width=300", story:
            "Germany's carbon emissions tell the story of coal and industry. Carbon dioxide rises into the sky from power plants that use coal as fuel. It is a reminder of the country's energetic roots. The automotive and manufacturing sectors are very active. This adds to the carbon story. Despite advances in renewable energy, heavy industry still leaves a long carbon shadow. Germany's carbon footprint is a mix of old and new. Progress and tradition: Every breath is part of the story."
    },
    {
        position: [0, 0.5, 0], note: "Poland", image: "/placeholder.svg?height=200&width=300", story:
            "Poland is still highly dependent on coal for energy production, and coal-fired power plants are a major source of carbon dioxide emissions. The nation's dependence on these plants casts a shadow of carbon dioxide in the air. The mining and manufacturing sectors increase their significant share and generate emissions from every activity. From the depths of the mines to the incinerators, the industrial heart of Poland beats with the pulse of coal."
    },
    {
        position: [-5, 0.5, 3], note: "Spain", image: "/placeholder.svg?height=200&width=300", story:
            "The steel industry's furnaces blaze, releasing carbon into the atmosphere. The country's bustling industrial base and vehicle fleet continue to increase the carbon footprint. Through busy streets and factories, carbon dioxide tells the story of progress and pollution. Methane emissions increase from animal farms and landfills where organic material breaks down. Spain's emissions journey has balanced development and sustainability, the pursuit of unity."
    },
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
    const texture = useLoader(THREE.TextureLoader, '/map/europe.png');

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
        </>
    );
}

export default function EuropeComponent() {
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