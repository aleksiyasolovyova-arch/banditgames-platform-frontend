import { useState } from "react";
import {useGamesList} from "@/hooks/game/useGames.ts";
import {GameActionButtons} from "@/components/admin/GameActionButtons.tsx";
import {UpdateUrlModal} from "@/components/admin/UpdateUrlModal.tsx";
import type {Game} from "@/types/game.types.ts"

export const AdminDashboardPage = () => {
    const { data: games, isLoading } = useGamesList();

    const [editingGame, setEditingGame] = useState<Game | null>(null);

    if (isLoading) return <div className="p-8 text-center text-gray-500">Loading submission queue...</div>;

    return (
        <div className="max-w-6xl mx-auto p-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Game Moderation Queue</h1>
                <p className="text-gray-600">Review incoming submissions and manage existing game assets.</p>
            </header>

            <div className="space-y-4">
                {games?.map(game => (
                    <div
                        key={game.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6 items-start"
                    >
                        {/* Left: Image Thumbnail (Visual check) */}
                        <div className="w-full md:w-32 h-32 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            <img src={game.pictureUrl} alt={game.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Middle: Game Info */}
                        <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{game.name}</h3>
                                <span className="text-sm bg-gray-100 px-2 py-0.5 rounded text-gray-600">
                  by {game.gameCreatorName}
                </span>
                            </div>

                            <p className="text-gray-600 mb-4 line-clamp-2">{game.description}</p>

                            <div className="text-sm text-gray-500 space-y-1">
                                <p><strong>Price:</strong> €{game.price}</p>
                                <p><strong>Rules:</strong> {game.rules.length} defined</p>
                                <p><strong>Achievements:</strong> {game.achievements.length} linked</p>
                            </div>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex flex-col gap-3 min-w-[140px] border-l pl-6">
                            <div className="mb-2">
                                <span className="text-xs uppercase font-bold text-gray-400">Status</span>
                                <div className="mt-1">
                                    <GameActionButtons game={game} />
                                </div>
                            </div>

                            <div className="mt-auto">
                                <button
                                    onClick={() => setEditingGame(game)}
                                    className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                    Edit URLs
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {editingGame && (
                <UpdateUrlModal
                    game={editingGame}
                    isOpen={!!editingGame}
                    onClose={() => setEditingGame(null)}
                />
            )}
        </div>
    )
}
