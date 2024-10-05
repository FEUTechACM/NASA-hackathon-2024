"use client";

import * as Slider from "@radix-ui/react-slider";
import { motion } from "framer-motion";
import { Settings, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsComponent() {
    const [isOpen, setIsOpen] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [volume, setVolume] = useState(50);
    const [skin, setSkin] = useState("Natural");

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            if (soundEnabled) {
                audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [soundEnabled]);

    const handleVolumeChange = (newValue: number[]) => {
        setVolume(newValue[0]);
        if (audioRef.current) {
            audioRef.current.volume = newValue[0] / 100;
        }
    };

    const toggleSound = (enabled: boolean) => {
        setSoundEnabled(enabled);
    };

    return (
        <div className="absolute top-4 right-4 z-40">
            <audio
                ref={audioRef}
                src="/climate_change.mp3"
                loop
            />
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Open settings</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <DropdownMenuLabel>Settings</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <div className="p-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="sound-toggle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Enable Sound
                                </Label>
                                <Switch
                                    id="sound-toggle"
                                    checked={soundEnabled}
                                    onCheckedChange={toggleSound}
                                />
                            </div>
                            {soundEnabled && (
                                <div className="mt-4">
                                    <Label htmlFor="volume-slider" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Volume
                                    </Label>
                                    <div className="flex items-center mt-2">
                                        <Volume2 className="w-4 h-4 mr-2" />
                                        <Slider.Root
                                            className="relative flex items-center select-none touch-none w-full h-5"
                                            value={[volume]}
                                            onValueChange={handleVolumeChange}
                                            max={100}
                                            step={1}
                                            aria-label="Volume"
                                        >
                                            <Slider.Track className="bg-secondary relative grow rounded-full h-1">
                                                <Slider.Range className="absolute bg-primary rounded-full h-full" />
                                            </Slider.Track>
                                            <Slider.Thumb
                                                className="block w-4 h-4 bg-primary rounded-full focus:outline-none"
                                            />
                                        </Slider.Root>
                                        <span className="ml-2 text-sm">{volume}%</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}