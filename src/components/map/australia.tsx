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
        position: [0, 0.5, 0], note: "Australia", image: "/placeholder.svg?height=200&width=300", story: "Australia faces serious problems with carbon emissions due to the burning of fossil fuels for fuel and transport, as well as deforestation. The coal industry is the largest contributor to CO2 emissions, with coal-fired power plants producing the most. In addition, the mining sector, which produces coal, iron, and other minerals, contributes to emissions through heavy machinery and transport. Agricultural development, especially animal husbandry, leads to deforestation, increasing natural growth. Logging companies also help convert forests into timber."
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
    const texture = useLoader(THREE.TextureLoader, '/map/aus.png');

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

export default function AustraliaComponent() {
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