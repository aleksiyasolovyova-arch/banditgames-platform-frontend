import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { Game } from '@/types/game.types.ts';

interface CarouselProps {
    items: Game[];
    autoPlayInterval?: number;
}

export function GameCarousel({ items, autoPlayInterval = 5000 }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (isHovering) return; // Pause on hover

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [items.length, isHovering, autoPlayInterval]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    // Calculate the position of a card relative to the center
    //I used AI for this, plus a bit of stackoverflow
    const getCardStyle = (index: number) => {
        const total = items.length;

        // This math handles the circular wrapping correctly
        // (so if current is 0, index 4 should be to the left, not far right)
        let offset = (index - currentIndex + total) % total;
        if (offset > total / 2) offset -= total;


        if (offset === 0) {
            return {
                x: 0,
                scale: 1,
                zIndex: 50,
                opacity: 1,
                rotateY: 0,
                filter: 'brightness(1)',
            };
        }

        // Immediate Neighbors (Left/Right)
        if (Math.abs(offset) === 1) {
            return {
                x: offset * 60 + '%', // Push 60% to left/right
                scale: 0.85,
                zIndex: 40,
                opacity: 0.7,
                rotateY: offset * -15, // Subtle 3D turn
                filter: 'brightness(0.6) blur(2px)',
            };
        }

        // Outer Neighbors
        if (Math.abs(offset) === 2) {
            return {
                x: offset * 35 + '%',
                scale: 0.7,
                zIndex: 30,
                opacity: 0.4,
                rotateY: offset * -25,
                filter: 'brightness(0.4) blur(4px)',
            };
        }

        // Hidden cards
        return {
            x: 0,
            scale: 0,
            zIndex: 0,
            opacity: 0,
            rotateY: 0,
            filter: 'brightness(0)',
        };
    };

    return (
        <div
            className="relative w-full h-[500px] flex items-center justify-center overflow-hidden perspective-1000 py-10"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
                {items.map((item, index) => {
                    const style = getCardStyle(index);
                    const isActive = index === currentIndex;

                    return (
                        <motion.div
                            key={item.id}
                            className="absolute w-[60%] md:w-[600px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer"
                            initial={false}
                            animate={{
                                x: style.x,
                                scale: style.scale,
                                zIndex: style.zIndex,
                                opacity: style.opacity,
                                rotateY: style.rotateY,
                                filter: style.filter,
                            }}
                            transition={{
                                duration: 0.6,
                                type: 'spring',
                                stiffness: 200,
                                damping: 30,
                            }}
                            onClick={() => setCurrentIndex(index)}
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-full object-cover"
                            />

                            {isActive && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8"
                                >
                                    <h2 className="text-4xl font-black text-white mb-2 drop-shadow-lg transform translate-z-10">
                                        {item.title}
                                    </h2>
                                    <p className="text-zinc-200 max-w-lg mb-6 drop-shadow-md text-lg">
                                        {item.description}
                                    </p>
                                    <div className="flex gap-4">
                                        <Button variant="white">
                                            Play Now
                                        </Button>
                                        <Button variant="glass">
                                            Details
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            <div className="absolute bottom-4 flex gap-2 z-50">
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            idx === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/30 hover:bg-white/60'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}