import type { Game } from "@/types/player.types.ts";
import { useLobby } from "@/hooks/player/useLobby.ts";
import {Button} from "@/components/ui/Button.tsx";

interface GameSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    game: Game;
}
export const GameSelectionModal = ({ isOpen, onClose, game }: GameSelectionModalProps) => {
    const {
        username,
        setUsername,
        isLoading,
        error,
        handlePlayAI,
        handlePlayStranger
    } = useLobby(game);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">

                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {game.title ? `Play ${game.title}` : 'Start Match'}
                        </h3>
                        <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mt-1">Select Mode</p>
                    </div>
                    <Button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-1 transition-all"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </Button>
                </div>

                <div className="p-6 space-y-6">
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm flex items-center gap-2">
                            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {error}
                        </div>
                    )}

                    <Button
                        onClick={handlePlayAI}
                        disabled={isLoading}
                        className="w-full group relative flex items-center justify-between p-4 border-2 border-blue-100 bg-blue-50/50 rounded-xl hover:bg-blue-50 hover:border-blue-500 transition-all active:scale-[0.99]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-gray-900 group-hover:text-blue-700">Practice vs AI</div>
                                <div className="text-xs text-gray-500">Instant start • Single Player</div>
                            </div>
                        </div>
                        <div className="text-blue-300 group-hover:text-blue-600 transition-colors">
                            {isLoading ? <span className="animate-spin">⏳</span> : '→'}
                        </div>
                    </Button>

                    <div className="relative flex items-center py-2">
                        <div className="flex-grow border-t border-gray-100"></div>
                        <span className="flex-shrink mx-4 text-xs font-bold text-gray-400 uppercase tracking-widest">OR PVP</span>
                        <div className="flex-grow border-t border-gray-100"></div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Challenge a Player</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter opponent's username..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:bg-white focus:border-transparent outline-none transition-all"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </div>

                        <Button
                            disabled={!username.trim() || isLoading}
                            onClick={handlePlayStranger}
                            className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2 ${
                                !username.trim() || isLoading
                                    ? 'bg-gray-300 cursor-not-allowed shadow-none'
                                    : 'bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/30 active:scale-[0.98]'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Connecting...</span>
                                </>
                            ) : (
                                <span>Create Match Lobby</span>
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}