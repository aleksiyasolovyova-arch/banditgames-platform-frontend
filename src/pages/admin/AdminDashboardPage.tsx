import { useState } from "react";
import {useGamesList} from "@/hooks/game/useGames.ts";
import {GameActionButtons} from "@/components/admin/GameActionButtons.tsx";
import {UpdateUrlModal} from "@/components/admin/UpdateUrlModal.tsx";
import type {Game} from "@/types/game.types.ts"
import {
    LayoutDashboard,
    Pencil,
    Trophy,
    ScrollText,
    Euro,
    User, Loader2
} from "lucide-react";
import {CreatePlatformAchievements} from "@/components/achievements/CreatePlatformAchievements.tsx";

export const AdminDashboardPage = () => {
    const {data: games, isLoading} = useGamesList();

    const [editingGame, setEditingGame] = useState<Game | null>(null);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-zinc-400">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
                <p>Loading submission queue...</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-8">

            <header
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                            <Trophy className="text-amber-400 w-6 h-6"/>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">
                            Create Platform Achievements
                        </h1>
                    </div>
                    <p className="text-zinc-400 max-w-xl">
                        Define new global milestones for players.
                    </p>
                </div>
            </header>
            <section className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <CreatePlatformAchievements />
            </section>

            <header
                className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-800 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-indigo-500/10 rounded-lg">
                            <LayoutDashboard className="text-indigo-400 w-6 h-6"/>
                        </div>
                        <h1 className="text-3xl font-black text-white tracking-tight">
                            Moderation Queue
                        </h1>
                    </div>
                    <p className="text-zinc-400 max-w-xl">
                        Review incoming game submissions, approve releases, and manage asset URLs for the platform
                        library.
                    </p>
                </div>
            </header>

            <div className="grid gap-4">
                {games?.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800 border-dashed">
                        <p className="text-zinc-500">No games found matching your criteria.</p>
                    </div>
                ) : (
                    games?.map(game => (
                        <div
                            key={game.id}
                            className="group relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-xl p-5 hover:border-indigo-500/30 hover:bg-zinc-900 transition-all duration-300 flex flex-col md:flex-row gap-6"
                        >
                            <div
                                className="w-full md:w-48 h-48 md:h-32 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 shadow-lg flex-shrink-0 relative group-hover:shadow-indigo-500/10 transition-all">
                                <img
                                    src={game.pictureUrl}
                                    alt={game.name}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                />
                                {/* Quick ID Overlay */}
                                <span
                                    className="absolute bottom-1 right-1 bg-black/60 text-zinc-500 text-[10px] px-1.5 py-0.5 rounded font-mono">
                                        ID: {game.id}
                                    </span>
                            </div>

                            <div className="flex-grow flex flex-col justify-between py-1">
                                <div>
                                    <div className="flex flex-wrap items-center gap-3 mb-2">
                                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                                            {game.name}
                                        </h3>
                                        <div
                                            className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700">
                                            <User size={12} className="text-zinc-400"/>
                                            <span className="text-xs font-medium text-zinc-300">
                                                    {game.gameCreatorName}
                                                </span>
                                        </div>
                                    </div>

                                    <p className="text-zinc-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                                        {game.description}
                                    </p>
                                </div>

                                <div
                                    className="flex flex-wrap gap-4 text-xs font-medium text-zinc-500 border-t border-white/5 pt-3">
                                    <div className="flex items-center gap-1.5">
                                        <Euro size={14} className="text-emerald-500"/>
                                        <span
                                            className="text-zinc-300">{game.price === 0 ? "Free to Play" : `€${game.price}`}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <ScrollText size={14} className="text-blue-500"/>
                                        <span className="text-zinc-300">{game.rules.length} Rules</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Trophy size={14} className="text-amber-500"/>
                                        <span className="text-zinc-300">{game.achievements.length} Achievements</span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 min-w-[160px] md:border-l border-zinc-800 md:pl-6">
                                <div className="w-full">
                                        <span
                                            className="hidden md:block text-[10px] uppercase font-bold text-zinc-600 mb-2 text-right tracking-wider">
                                            Current Status
                                        </span>
                                    <div className="flex justify-end">
                                        <GameActionButtons game={game}/>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setEditingGame(game)}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-all group-hover:bg-indigo-500/10 group-hover:text-indigo-400"
                                >
                                    <Pencil size={14}/>
                                    <span>Edit URLs</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
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
