import { useState } from "react";
import {useGamesList} from "@/hooks/game/useGames.ts";
import {GameActionButtons} from "@/components/admin/GameActionButtons.tsx";
import {UpdateGameModal} from "@/components/admin/UpdateGameModal.tsx";
import type {Game} from "@/types/game.types.ts"
import {CreatePlatformAchievements} from "@/components/achievements/CreatePlatformAchievements.tsx";
import {PlatformAchievementList} from "@/components/admin/PlatformAchievementList.tsx";
import {
    LayoutDashboard,
    Pencil,
    Trophy,
    ScrollText,
    Euro,
    User, Loader2, Bot
} from "lucide-react";

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

            <section>
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                    <div className="p-2 bg-amber-500/10 rounded-lg">
                        <Trophy className="text-amber-400 w-5 h-5"/>
                    </div>
                    <h1 className="text-xl font-bold text-white tracking-tight">
                        Platform Achievements Library
                    </h1>
                </div>
                <PlatformAchievementList />
            </section>


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

            <section>
                <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <LayoutDashboard className="text-indigo-400 w-5 h-5"/>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight">Game Management</h2>
                        <p className="text-zinc-500 text-sm mt-1">Review pending submissions and manage active games.</p>
                    </div>
                </div>

                <div className="grid gap-4">
                    {games?.length === 0 ? (
                        <div className="text-center py-20 bg-zinc-900/50 rounded-xl border border-zinc-800 border-dashed">
                            <p className="text-zinc-500">No games found in the system.</p>
                        </div>
                    ) : (
                        games?.map(game => (
                            <div
                                key={game.id}
                                className={`
                                    group relative backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 flex flex-col md:flex-row gap-6
                                    ${game.registrationState === 'PENDING'
                                    ? 'bg-amber-950/10 border-amber-500/20 hover:bg-amber-900/10'
                                    : 'bg-zinc-900/80 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                                }
                                `}
                            >
                                <div className="w-full md:w-48 h-48 md:h-32 bg-zinc-950 rounded-lg overflow-hidden border border-zinc-800 shadow-lg flex-shrink-0 relative">
                                    <img
                                        src={game.pictureUrl}
                                        alt={game.name}
                                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    />
                                    {game.registrationState === 'PENDING' && (
                                        <span className="absolute top-2 left-2 bg-amber-500 text-black font-bold text-[10px] px-2 py-0.5 rounded shadow-lg animate-pulse">
                                            PENDING REVIEW
                                        </span>
                                    )}
                                </div>

                                <div className="flex-grow flex flex-col justify-between py-1">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-white tracking-tight">
                                                {game.name}
                                            </h3>
                                            <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-zinc-800 border border-zinc-700">
                                                <User size={12} className="text-zinc-400"/>
                                                <span className="text-xs font-medium text-zinc-300">{game.gameCreatorName}</span>
                                            </div>
                                            {game.playableWithAI && (
                                                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                                                    <Bot size={12} className="text-emerald-400"/>
                                                    <span className="text-xs font-medium text-emerald-400">AI Ready</span>
                                                </div>
                                            )}
                                        </div>
                                        <p className="text-zinc-400 text-sm line-clamp-2 mb-4 leading-relaxed">{game.description}</p>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-xs font-medium text-zinc-500 border-t border-white/5 pt-3">
                                        <div className="flex items-center gap-1.5"><Euro size={14} className="text-emerald-500"/><span className="text-zinc-300">{game.price === 0 ? "Free" : `€${game.price}`}</span></div>
                                        <div className="flex items-center gap-1.5"><ScrollText size={14} className="text-blue-500"/><span className="text-zinc-300">{game.rules.length} Rules</span></div>
                                        <div className="flex items-center gap-1.5"><Trophy size={14} className="text-amber-500"/><span className="text-zinc-300">{game.achievements.length} Achievements</span></div>
                                    </div>
                                </div>

                                <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4 min-w-[160px] md:border-l border-zinc-800 md:pl-6">
                                    <div className="w-full flex justify-end">
                                        <GameActionButtons game={game}/>
                                    </div>

                                    <button
                                        onClick={() => setEditingGame(game)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-all group-hover:bg-indigo-500/10 group-hover:text-indigo-400"
                                    >
                                        <Pencil size={14}/>
                                        <span>Edit Settings</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {editingGame && (
                <UpdateGameModal
                    game={editingGame}
                    isOpen={!!editingGame}
                    onClose={() => setEditingGame(null)}
                />
            )}
        </div>

    )
}
