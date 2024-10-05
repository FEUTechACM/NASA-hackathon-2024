"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Fragment, useEffect, useState } from "react";

interface Continent {
    name: string;
    images: string[];
    description: string;
    story: string;
    references: string[];
}
const continents = [
    {
        name: "Africa",
        images: [
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
        ],
        description: "Africa is the world's second-largest and second-most populous continent, after Asia in both cases. At about 30.3 million km² including adjacent islands, it covers 6% of Earth's total surface area and 20% of its land area. With 1.3 billion people as of 2018, it accounts for about 16% of the world's human population.",
        story: "Africa, the cradle of human civilization, has a rich and diverse history spanning millions of years. From the ancient Egyptian pyramids to the vibrant cultures of sub-Saharan Africa, the continent has played a crucial role in shaping world history. Today, Africa faces both challenges and opportunities as it strives for economic development and political stability while preserving its unique ecosystems and cultural heritage.",
        references: [
            "Diamond, J. (1997). Guns, Germs, and Steel: The Fates of Human Societies. W.W. Norton & Company.",
            "Reader, J. (1998). Africa: A Biography of the Continent. Penguin Books.",
            "Rodney, W. (1972). How Europe Underdeveloped Africa. Bogle-L'Ouverture Publications."
        ]
    },
    {
        name: "Antarctica",
        images: [
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
        ],
        description: "Antarctica is Earth's southernmost continent. It contains the geographic South Pole and is situated in the Antarctic region of the Southern Hemisphere, almost entirely south of the Antarctic Circle, and is surrounded by the Southern Ocean. At 14,200,000 square kilometres, it is the fifth-largest continent.",
        story: "Antarctica, the frozen continent, remains one of the last great wildernesses on Earth. Despite its harsh climate, it plays a crucial role in the planet's climate system and is home to unique wildlife adapted to extreme conditions. Scientific research in Antarctica has led to groundbreaking discoveries in fields ranging from climate science to astronomy. The continent is protected by the Antarctic Treaty System, which dedicates it to peaceful scientific research and environmental protection.",
        references: [
            "Fogg, G.E. (1992). A History of Antarctic Science. Cambridge University Press.",
            "Berkman, P.A. (2002). Science into Policy: Global Lessons from Antarctica. Academic Press.",
            "Walton, D.W.H. (ed.) (2013). Antarctica: Global Science from a Frozen Continent. Cambridge University Press."
        ]
    },
    {
        name: "Asia",
        images: [
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
        ],
        description: "Asia is Earth's largest and most populous continent, located primarily in the Eastern and Northern Hemispheres. It shares the continental landmass of Eurasia with the continent of Europe and the continental landmass of Afro-Eurasia with both Europe and Africa. Asia covers an area of 44,579,000 square kilometres, about 30% of Earth's total land area and 8.7% of the Earth's total surface area.",
        story: "Asia, the world's largest and most diverse continent, has been the birthplace of many of the world's major civilizations, religions, and philosophical traditions. From the ancient Silk Road to modern-day economic powerhouses, Asia has long been a center of cultural exchange and innovation. Today, the continent is home to some of the world's fastest-growing economies and is playing an increasingly important role in global affairs. However, it also faces significant challenges, including environmental degradation, political tensions, and rapid urbanization.",
        references: [
            "Keay, J. (2000). India: A History. Grove Press.",
            "Ebrey, P.B. (2010). The Cambridge Illustrated History of China. Cambridge University Press.",
            "Gordon, A. (2003). A Modern History of Japan: From Tokugawa Times to the Present. Oxford University Press."
        ]
    },
    {
        name: "Europe",
        images: [
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
        ],
        description: "Europe is a continent located entirely in the Northern Hemisphere and mostly in the Eastern Hemisphere. It comprises the westernmost part of Eurasia and is bordered by the Arctic Ocean to the north, the Atlantic Ocean to the west, the Mediterranean Sea to the south, and Asia to the east.",
        story: "Europe, despite its relatively small size, has had an outsized impact on world history. From the ancient Greek and Roman civilizations to the Renaissance, the Industrial Revolution, and the formation of the European Union, the continent has been a crucible of ideas and innovations that have shaped the modern world. Europe's history is marked by periods of conflict and cooperation, leading to the development of diverse cultures, languages, and political systems. Today, the continent faces challenges such as economic integration, migration, and balancing national sovereignty with supranational cooperation.",
        references: [
            "Davies, N. (1996). Europe: A History. Oxford University Press.",
            "Judt, T. (2005). Postwar: A History of Europe Since 1945. Penguin Books.",
            "Mazower, M. (1998). Dark Continent: Europe's Twentieth Century. Allen Lane."
        ]
    },
    {
        name: "North America",
        images: [
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
        ],
        description: "North America is a continent entirely within the Northern Hemisphere and almost all within the Western Hemisphere. It can also be described as the northern subcontinent of the Americas. It is bordered to the north by the Arctic Ocean, to the east by the Atlantic Ocean, to the southeast by South America and the Caribbean Sea, and to the west and south by the Pacific Ocean.",
        story: "North America's history is a tapestry of indigenous cultures, European colonization, and waves of immigration that have shaped its modern identity. From the pre-Columbian civilizations to the formation of the United States and Canada, the continent has been a land of opportunity and conflict. North America has played a pivotal role in global affairs, particularly since the 20th century, and has been at the forefront of technological innovation and cultural exports. Today, the continent grapples with issues such as income inequality, racial justice, and environmental sustainability.",
        references: [
            "Mann, C.C. (2005). 1491: New Revelations of the Americas Before Columbus. Knopf.",
            "Howe, D.W. (2007). What Hath God Wrought: The Transformation of America, 1815-1848. Oxford University Press.",
            "Bothwell, R. (2006). The Penguin History of Canada. Penguin Canada."
        ]
    },
    {
        name: "Oceania",
        images: [
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
        ],
        description: "Oceania is a geographic region that includes Australasia, Melanesia, Micronesia and Polynesia. Spanning the Eastern and Western hemispheres, Oceania has a land area of 8,525,989 square kilometres and a population of over 41 million. When compared with the continents, the region of Oceania is the smallest in land area and the second smallest in population after Antarctica.",
        story: "Oceania, a vast region of islands and archipelagos in the Pacific Ocean, has a history that spans thousands of years of human migration and settlement. The indigenous peoples of Oceania developed sophisticated navigation techniques that allowed them to populate even the most remote islands. European exploration and colonization in the 18th and 19th centuries dramatically changed the region, leading to complex interactions between indigenous cultures and Western influences. Today, Oceania faces unique challenges related to climate change, as rising sea levels threaten many low-lying island nations. The region is also working to preserve its rich cultural heritage while participating in the global economy.",
        references: [
            "Denoon, D. (ed.) (1997). The Cambridge History of the Pacific Islanders. Cambridge University Press.",
            "Howe, K.R. (2003). The Quest for Origins: Who First Discovered and Settled New Zealand and the Pacific Islands? Penguin Books.",
            "Matsuda, M.K. (2012). Pacific Worlds: A History of Seas, Peoples, and Cultures. Cambridge University Press."
        ]
    },
    {
        name: "South America",
        images: [
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
            "/placeholder.svg?height=200&width=300",
        ],
        description: "South America is a continent entirely in the Western Hemisphere and mostly in the Southern Hemisphere, with a relatively small portion in the Northern Hemisphere. It can also be described as the southern subcontinent of the Americas. It is bordered on the west by the Pacific Ocean and on the north and east by the Atlantic Ocean; North America and the Caribbean Sea lie to the northwest.",
        story: "South America's history is marked by the rise and fall of great indigenous civilizations, such as the Inca Empire, followed by European colonization and eventual independence movements in the 19th century. The continent has been shaped by its diverse geography, from the Amazon rainforest to the Andes mountains, which has given rise to unique ecosystems and cultures. In the 20th and 21st centuries, South America has experienced periods of economic boom and bust, political instability, and social movements striving for equality and justice. Today, the continent faces challenges such as deforestation, economic inequality, and political polarization, while also showcasing vibrant cultures and emerging economies.",
        references: [
            "Chasteen, J.C. (2001). Born in Blood and Fire: A Concise History of Latin America. W.W. Norton & Company.",
            "Galeano, E. (1997). Open Veins of Latin America: Five Centuries of the Pillage of a Continent. Monthly Review Press.",
            "Williamson, E. (2009). The Penguin History of Latin America. Penguin Books."
        ]
    },
];

export default function BlurredBackgroundContinentDrawer() {
    const [selectedContinent, setSelectedContinent] = useState<Continent | null>(null);
    const [clickedContinents, setClickedContinents] = useState<{ [key: string]: boolean; }>({});
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedContinent(null);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const handleContinentClick = (continent: Continent) => {
        setSelectedContinent(continent);
        setClickedContinents(prev => ({ ...prev, [continent.name]: true }));
        setCurrentImageIndex(0);
    }


    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedContinent(null);
            }
        };

        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

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
                            className="fixed inset-x-0 bottom-0 z-50 w-full sm:w-[800px] mx-auto bg-background/80 backdrop-blur-sm border rounded-t-lg shadow-lg"
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
                                onClick={() => setSelectedContinent(null)}
                            >
                                Close
                            </Button>
                        </motion.div>
                    </Fragment>
                )}
            </AnimatePresence>
            <div className="fixed inset-x-0 bottom-0 p-1 sm:p-2 bg-transparent">
                <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 max-w-3xl mx-auto">
                    {continents.map((continent) => (
                        <Button
                            key={continent.name}
                            variant="outline"
                            onClick={() => handleContinentClick(continent)}
                            className={`${clickedContinents[continent.name] ? "bg-green-500 hover:bg-green-600 text-white" : ""}`}
                        >
                            {continent.name}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}