import { useState } from 'react';
import { useGameListPlayer } from "@/hooks/game/useGames.ts";
import { useLobby } from "@/hooks/player/useLobby.ts";
import { Loader2, Gamepad2 } from 'lucide-react';
import type { Friend } from '@/types/player.types.ts';
import { Button } from "@/components/ui/Button.tsx";
import axios from "axios";

interface FriendChallengeModalProps {
    isOpen: boolean;
    onClose: () => void;
    friend: Friend;
}

export function FriendChallengeModal({ isOpen, onClose, friend }: FriendChallengeModalProps) {
    const { data: games, isLoading: isGamesLoading } = useGameListPlayer();

    // 1. Hook usage remains clean, but 'error' is now an object
    const { handleChallengeFriend, isLoading, error } = useLobby();

    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

    if (!isOpen) return null;

    const onSendChallenge = () => {
        if (selectedGameId) {
            // 2. No 'await' needed here. The hook handles navigation onSuccess.
            handleChallengeFriend(friend.playerId, selectedGameId);
        }
    };

    // Helper to extract error message from the TanStack Query error object
    const getErrorMessage = () => {
        if (!error) return null;
        if (axios.isAxiosError(error)) {
            return error.response?.data?.message || error.message;
        }
        return (error instanceof Error) ? error.message : "An unexpected error occurred";
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[80vh]">

                <div className="p-6 border-b border-zinc-800 bg-zinc-900">
                    <h3 className="text-xl font-bold text-white">Challenge {friend.username}</h3>
                    <p className="text-zinc-400 text-sm">Select a game from the library</p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                    {isGamesLoading ? (
                        <div className="flex justify-center p-8">
                            <Loader2 className="animate-spin text-indigo-500" />
                        </div>
                    ) : (
                        games?.map((game) => (
                            <Button
                                // 3. Updated 'game.id' to 'game.gameId' to match Backend DTO
                                key={game.gameId}
                                onClick={() => setSelectedGameId(game.gameId)}
                                className={`w-full flex items-center gap-4 p-3 rounded-xl border transition-all text-left group
                                    ${selectedGameId === game.gameId
                                    ? 'bg-indigo-900/30 border-indigo-500 ring-1 ring-indigo-500'
                                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-600'
                                }`}
                            >
                                <img
                                    src={game.pictureUrl}
                                    alt={game.name}
                                    className="w-12 h-12 rounded-lg object-cover bg-zinc-800"
                                />
                                <div>
                                    <h4 className={`font-bold ${selectedGameId === game.gameId ? 'text-white' : 'text-zinc-300'}`}>
                                        {game.name}
                                    </h4>
                                    {game.playableWithAI && (
                                        <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider">
                                            AI Supported
                                        </span>
                                    )}
                                </div>
                                {selectedGameId === game.gameId && (
                                    <Gamepad2 className="ml-auto text-indigo-400" size={20} />
                                )}
                            </Button>
                        ))
                    )}
                </div>

                <div className="p-4 border-t border-zinc-800 bg-zinc-900 flex gap-3 flex-col">
                    {/* 4. Render the safe error message */}
                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded">
                            {getErrorMessage()}
                        </div>
                    )}

                    <div className="flex gap-3">
                        <Button
                            onClick={onClose}
                            className="flex-1 py-3 rounded-xl font-bold text-zinc-400 hover:bg-zinc-800 transition-colors"
                        >
                            Cancel
                        </Button>

                        <Button
                            onClick={onSendChallenge}
                            disabled={!selectedGameId || isLoading}
                            className={`flex-1 py-3 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center
                                ${!selectedGameId || isLoading
                                ? 'bg-zinc-700 cursor-not-allowed text-zinc-500'
                                : 'bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20'
                            }`}
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Send Challenge'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}