import { Continent } from "@/app/page";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
interface ExtendedContinentDrawerProps {
    selectedContinent: Continent | null;
    onClose: () => void;
}

export default function ExtendedContinentDrawer({ selectedContinent, onClose }: ExtendedContinentDrawerProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const nextImage = () => {
        if (!selectedContinent) return;
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % selectedContinent.images.length);
    };

    const prevImage = () => {
        if (!selectedContinent) return;
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + selectedContinent.images.length) % selectedContinent.images.length);

    }

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [onClose]);

    return (
        <div>
            <AnimatePresence>
                {selectedContinent && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-x-0 bottom-0 z-50 w-full md:w-[800px] lg:w-[1000px] mx-auto bg-background border rounded-t-lg shadow-lg overflow-hidden"
                            style={{ height: "80vh" }}
                        >
                            <ScrollArea className="h-full">
                                <div className="p-6">
                                    <h2 className="text-3xl font-bold mb-4 text-primary">{selectedContinent.name}</h2>
                                    <Tabs defaultValue="overview" className="w-full">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="overview">Overview</TabsTrigger>
                                            <TabsTrigger value="story">Story</TabsTrigger>
                                            <TabsTrigger value="references">References</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="overview" className="w-full">
                                            <div className="relative mb-4 w-full">
                                                <div className="mb-4 w-full">
                                                    <div className="relative max-h-96  aspect-video w-full h-full">
                                                        <Image
                                                            src={selectedContinent.images[currentImageIndex]}
                                                            alt={selectedContinent.name}
                                                            fill
                                                            className="w-full aspect-video object-cover rounded-md"
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-background/50 hover:bg-background/75"
                                                            onClick={prevImage}
                                                        >
                                                            <ChevronLeft className="h-4 w-4" />
                                                            <span className="sr-only">Previous image</span>
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-background/50 hover:bg-background/75"
                                                            onClick={nextImage}
                                                        >
                                                            <ChevronRight className="h-4 w-4" />
                                                            <span className="sr-only">Next image</span>
                                                        </Button>
                                                    </div>
                                                </div>
                                                <p className="text-primary mb-4">{selectedContinent.description}</p>
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="story">
                                            <p className="text-sm text-primary">{selectedContinent.story}</p>
                                        </TabsContent>
                                        <TabsContent value="references">
                                            <ul className="list-disc list-inside text-sm text-primary">
                                                {selectedContinent.references.map((reference, index) => (
                                                    <li key={index}>{reference}</li>
                                                ))}
                                            </ul>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </ScrollArea>
                            <Button
                                className="absolute top-2 right-2"
                                variant="ghost"
                                onClick={onClose}
                            >
                                Close
                            </Button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}