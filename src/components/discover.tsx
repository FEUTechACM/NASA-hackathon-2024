"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from 'react';

export default function Component() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`z-50 transition-all duration-300 ${isOpen ? 'blur-sm' : ''}`}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="z-50 absolute top-4 left-4 bg-white text-black hover:bg-gray-100 hover:text-black"
                    >
                        Discover
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Exciting Discovery!</DialogTitle>
                        <DialogDescription>
                            You've unlocked a hidden treasure of knowledge. Embrace the journey of continuous learning and growth!
                        </DialogDescription>
                    </DialogHeader>
                    <p className="mt-4">
                        Every day is an opportunity to learn something new. Keep exploring, keep discovering, and never stop growing!
                    </p>
                </DialogContent>
            </Dialog>
        </div>
    );
}