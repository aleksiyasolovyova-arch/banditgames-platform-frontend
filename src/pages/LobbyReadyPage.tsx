import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import type { LobbyDto } from '@/types/player.types.ts';
import { ExternalLink, ArrowLeft, Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function LobbyReadyPage() {
    const location = useLocation();
    const lobby = location.state as LobbyDto;

    const [copiedField, setCopiedField] = useState<string | null>(null);

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

    const handleCopy = async (text: string, fieldId: string) => {
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopiedField(fieldId);
        setTimeout(() => setCopiedField(null), 2000);
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-xl w-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">LOBBY READY</h1>
                    <p className="text-zinc-400">Your match has been initialized.</p>
                </div>

                <div className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex flex-col gap-2">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Player 1 ID</span>
                            <div className="flex gap-2">
                                <input
                                    readOnly
                                    value={lobby.player1Id}
                                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 text-zinc-300 font-mono text-xs focus:outline-none focus:border-zinc-600 transition-colors"
                                />
                                <button
                                    onClick={() => handleCopy(lobby.player1Id, 'p1')}
                                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded transition-colors border border-zinc-700"
                                    title="Copy Player 1 ID"
                                >
                                    {copiedField === 'p1' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>

                        <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 flex flex-col gap-2">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Player 2 ID</span>
                            <div className="flex gap-2">
                                <input
                                    readOnly
                                    value={lobby.player2Id || "Waiting for Join..."}
                                    className={`w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1.5 font-mono text-xs focus:outline-none focus:border-zinc-600 transition-colors
                                        ${lobby.player2Id ? 'text-zinc-300' : 'text-zinc-600 italic'}`}
                                />
                                <button
                                    onClick={() => lobby.player2Id && handleCopy(lobby.player2Id, 'p2')}
                                    disabled={!lobby.player2Id}
                                    className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white rounded transition-colors border border-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Copy Player 2 ID"
                                >
                                    {copiedField === 'p2' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Game Link Section */}
                    <div className="bg-indigo-900/10 border border-indigo-500/20 p-5 rounded-xl">
                        <label className="text-indigo-300 text-xs font-bold uppercase mb-2 block tracking-wider">Game Uplink</label>
                        <div className="flex gap-2">
                            <input
                                readOnly
                                value={lobby.link}
                                className="w-full bg-zinc-950 border border-indigo-500/30 rounded-lg px-3 py-3 text-zinc-300 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                            />
                            <button
                                onClick={() => handleCopy(lobby.link, 'link')}
                                className="px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg transition-colors border border-zinc-700"
                                title="Copy Game Link"
                            >
                                {copiedField === 'link' ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <a
                            href={lobby.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <Button variant="primary" className="w-full py-4 text-lg shadow-lg shadow-indigo-500/20">
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