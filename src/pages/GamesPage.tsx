import { useState } from 'react';
import { Button } from '../components/ui/Button';
//TODO: Go over every color everywhere and switch it with the centralized tailwind equivalent
export function GamesPage() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const mockGames = [
        {
            id: 1,
            title: 'Tic-Tac-Toe',
            description: 'Classic 3x3 grid strategy game. Get three in a row to win!',
            image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=600&h=400&fit=crop',
        },
        {
            id: 2,
            title: 'Connect Four',
            description: 'Drop discs and connect four in a row - vertically, horizontally, or diagonally!',
            image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=600&h=400&fit=crop',
        },
        {
            id: 3,
            title: 'Chess',
            description: 'The ultimate strategy game. Checkmate your opponent to win!',
            image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=600&h=400&fit=crop',
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-white mb-2">Game Library</h1>
                <p className="text-gray-400">Discover and play amazing games</p>
            </div>

            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Search games..."
                        className="w-full px-4 py-3 bg-game-card border border-game-border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockGames.map((game) => (
                    <div
                        key={game.id}
                        onMouseEnter={() => setHoveredCard(game.id)}
                        onMouseLeave={() => setHoveredCard(null)}
                        className="group relative bg-game-card rounded-xl overflow-hidden border border-game-border hover:border-brand-primary transition-all duration-300 hover:shadow-2xl hover:shadow-brand-primary/20 hover:-translate-y-1"
                    >
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={game.image}
                                alt={game.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className={`absolute inset-0 bg-gradient-to-t from-game-dark via-game-dark/50 to-transparent transition-opacity duration-300 ${
                                hoveredCard === game.id ? 'opacity-100' : 'opacity-0'
                            }`}>
                            </div>
                            <button className="absolute top-3 right-3 w-10 h-10 bg-game-dark/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-game-hover transition-all">
                                <span className="text-xl">🤍</span>
                            </button>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-white group-hover:text-brand-primary transition-colors">
                                    {game.title}
                                </h3>
                            </div>

                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                {game.description}
                            </p>
                            <Button className="w-full group-hover:shadow-lg group-hover:shadow-brand-primary/50 transition-all">
                                Play Now
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
