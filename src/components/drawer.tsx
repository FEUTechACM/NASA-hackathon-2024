import { Continent } from "@/app/page";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect } from "react";

interface ExtendedContinentDrawerProps {
    selectedContinent: Continent | null;
    onClose: () => void;
}

export default function ExtendedContinentDrawer({ selectedContinent, onClose }: ExtendedContinentDrawerProps) {
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
                    <Fragment>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-40"
                            style={{
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                filter: 'blur(10px)',
                            }}
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: "5%" }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-x-0 bottom-0 z-50 w-full md:w-[800px] mx-auto bg-background/80 backdrop-blur-sm border rounded-t-lg shadow-lg"
                            style={{ maxHeight: "calc(80vh - 40px)" }}
                        >
                            <ScrollArea className="h-[calc(95vh-40px)]">
                                <div className="p-6">
                                    <h2 className="text-3xl font-bold mb-4 text-primary">{selectedContinent.name}</h2>
                                    <Tabs defaultValue="overview" className="w-full">
                                        <TabsList className="grid w-full grid-cols-3">
                                            <TabsTrigger value="overview">Overview</TabsTrigger>
                                            <TabsTrigger value="story">Story</TabsTrigger>
                                            <TabsTrigger value="references">References</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="overview">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                                                {selectedContinent.images.map((src, index) => (
                                                    <Image
                                                        key={index}
                                                        src={src}
                                                        alt={`${selectedContinent.name} image ${index + 1}`}
                                                        width={300}
                                                        height={200}
                                                        className="rounded-md"
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm text-primary mb-4">{selectedContinent.description}</p>
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
                    </Fragment>
                )}
            </AnimatePresence>
        </div>
    );
}