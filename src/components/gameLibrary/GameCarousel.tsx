import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { Game } from '@/types/game.types.ts';
import { GameInfoOverlay } from './GameInfoOverlay';

interface CarouselProps {
    items: Game[];
    autoPlayInterval?: number;
}

export function GameCarousel({ items, autoPlayInterval = 5000 }: CarouselProps) {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isHovering, setIsHovering] = useState<boolean>(false);

    const [detailsGameId, setDetailsGameId] = useState<string | null>(null);

    useEffect(() => {
        if (isHovering || detailsGameId !== null) return;

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % items.length);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [items.length, isHovering, autoPlayInterval, detailsGameId]);

    const getCardStyle = (index: number) => {
        const total = items.length;
        let offset = (index - currentIndex + total) % total;
        if (offset > total / 2) offset -= total;

        if (offset === 0) return { x: 0, scale: 1, zIndex: 50, opacity: 1, rotateY: 0, filter: 'brightness(1)' };
        if (Math.abs(offset) === 1) return { x: offset * 60 + '%', scale: 0.85, zIndex: 40, opacity: 0.7, rotateY: offset * -15, filter: 'brightness(0.6) blur(2px)' };
        if (Math.abs(offset) === 2) return { x: offset * 35 + '%', scale: 0.7, zIndex: 30, opacity: 0.4, rotateY: offset * -25, filter: 'brightness(0.4) blur(4px)' };

        return { x: 0, scale: 0, zIndex: 0, opacity: 0, rotateY: 0, filter: 'brightness(0)' };
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
                    const isShowingDetails = detailsGameId === item.id;

                    return (
                        <motion.div
                            key={item.id}
                            className="absolute w-[60%] md:w-[600px] aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer bg-zinc-900"
                            initial={false}
                            animate={{
                                x: style.x,
                                scale: style.scale,
                                zIndex: style.zIndex,
                                opacity: style.opacity,
                                rotateY: style.rotateY,
                                filter: style.filter,
                            }}
                            transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 30 }}
                            onClick={() => { if (!isActive) setCurrentIndex(index); }}
                        >
                            <img
                                src={item.pictureUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />

                            {isActive && !isShowingDetails && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8"
                                >
                                    <h2 className="text-4xl font-black text-white mb-2 drop-shadow-lg transform translate-z-10">
                                        {item.name}
                                    </h2>
                                    <p className="text-zinc-200 max-w-lg mb-6 drop-shadow-md text-lg line-clamp-2">
                                        {item.description}
                                    </p>
                                    <div className="flex gap-4 relative z-20">
                                        <Button variant="white">Play Now</Button>
                                        <Button
                                            variant="glass"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setDetailsGameId(item.id);
                                            }}
                                        >
                                            Details
                                        </Button>
                                    </div>
                                </motion.div>
                            )}

                            <GameInfoOverlay
                                game={item}
                                isOpen={isShowingDetails}
                                onClose={() => setDetailsGameId(null)}
                            />
                        </motion.div>
                    );
                })}
            </div>

            <div className="absolute bottom-4 flex gap-2 z-50">
                {items.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white w-8' : 'bg-white/30 hover:bg-white/60'}`}
                    />
                ))}
            </div>
        </div>
    );
}