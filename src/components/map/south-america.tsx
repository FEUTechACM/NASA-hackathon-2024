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
    { position: [1.5, 0.5, -1.4], note: "Brazil", image: "/placeholder.svg?height=200&width=300", story: "In Brazil, the fields resonate with the low hum of cattle grazing. Methane rises from their digestion, a significant contributor to South America's emissions. The land and mines also add to the methane mix. Efforts to mitigate these effects focus on sustainable livestock practices and improved waste management." },
    { position: [0, 0.5, 2.4], note: "Argentina", image: "/placeholder.svg?height=200&width=300", story: "In Argentina, cattle ranching dominates the landscape, producing methane through livestock digestion. The agricultural lands and mining activities contribute further emissions. Strategies here include better agricultural practices and enhanced methane capture technologies to reduce the environmental footprint." },
    { position: [0, 0.5, -3.4], note: "Colombia", image: "/placeholder.svg?height=200&width=300", story: "In Colombia, livestock farming and landfills release substantial methane into the atmosphere. Agricultural advancements and waste management improvements are key measures to control these emissions. The country's focus on modernizing farming practices aims to lessen the impact on the environment." },
    { position: [-1.1, 0.5, -1.5], note: "Peru", image: "/placeholder.svg?height=200&width=300", story: "In Peru, methane emissions are primarily driven by livestock farming and mining operations. The government is working on improving agricultural methods and waste management practices to control these emissions. Methane capture technologies are also being explored to reduce the environmental footprint." },
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
    const texture = useLoader(THREE.TextureLoader, '/map/sa.png');

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

export default function SouthAmericaComponent() {
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