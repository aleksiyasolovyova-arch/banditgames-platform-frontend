import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import type { LobbyDto } from '@/types/player.types.ts';
import { ExternalLink, ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function LobbyReadyPage() {
    const location = useLocation();
    const lobby = location.state as LobbyDto;
    const [copied, setCopied] = useState(false);

    // Fallback if user navigates here directly without state
    if (!lobby) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">No Active Lobby</h2>
                    <Link to="/games" className="text-indigo-400 hover:text-indigo-300">Return to Library</Link>
                </div>
            </div>
        );
    }

    const handleCopy = async () => {
        await navigator.clipboard.writeText(lobby.link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-lg w-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">LOBBY READY</h1>
                    <p className="text-zinc-400">Your match has been initialized.</p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                            <span className="text-xs text-zinc-500 uppercase font-bold">Player 1 ID</span>
                            <div className="text-zinc-300 font-mono text-xs truncate mt-1" title={lobby.player1Id}>
                                {lobby.player1Id}
                            </div>
                        </div>
                        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                            <span className="text-xs text-zinc-500 uppercase font-bold">Player 2 ID</span>
                            <div className="text-zinc-300 font-mono text-xs truncate mt-1" title={lobby.player2Id}>
                                {lobby.player2Id || "Waiting for Join..."}
                            </div>
                        </div>
                    </div>

                    <div className="bg-indigo-900/20 border border-indigo-500/30 p-5 rounded-xl">
                        <label className="text-indigo-300 text-xs font-bold uppercase mb-2 block">Game Uplink</label>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                value={lobby.link}
                                className="w-full bg-zinc-950 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-300 text-sm focus:outline-none"
                            />
                            <button
                                onClick={handleCopy}
                                className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700"
                                title="Copy Link"
                            >
                                {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        {/*
                           Using <a> with target="_blank" to force a new tab.
                        */}
                        <a
                            href={lobby.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <Button variant="primary" className="w-full py-4 text-lg">
                                <ExternalLink size={20} className="mr-2" />
                                Launch Game
                            </Button>
                        </a>

                        <Link to="/games" className="w-full">
                            <Button variant="secondary" className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
                                <ArrowLeft size={18} className="mr-2" />
                                Back to Library
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}