import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Search, Check, ShieldAlert, Loader2 } from 'lucide-react';
import { useAddFriend } from '@/hooks/player/useFriendActions';

export function AddFriendView() {
    const [recipientId, setRecipientId] = useState('');
    const { sendRequest, resetStatus, isLoading, status, message } = useAddFriend();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await sendRequest(recipientId);
        if (success) setRecipientId('');
    };

    return (
        <div className="max-w-2xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 backdrop-blur-xl">
                <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">
                    Add Friend
                </h2>
                <p className="text-zinc-400 mb-6 text-sm">
                    You can add friends with their exact username.
                </p>

                <form onSubmit={handleSubmit} className="relative">
                    <div className={`
                        flex items-center bg-zinc-950 border-2 rounded-xl overflow-hidden transition-colors
                        ${status === 'error' ? 'border-red-500/50' : status === 'success' ? 'border-emerald-500/50' : 'border-zinc-800 focus-within:border-indigo-500'}
                    `}>
                        <div className="pl-4 text-zinc-500">
                            <Search size={20} />
                        </div>
                        <input
                            type="text"
                            value={recipientId}
                            onChange={(e) => {
                                setRecipientId(e.target.value);
                                resetStatus();
                            }}
                            placeholder="Enter player UUID..."
                            className="w-full bg-transparent p-4 text-white placeholder-zinc-600 focus:outline-none"
                            disabled={isLoading}
                        />
                        <div className="pr-2">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={!recipientId || isLoading}
                                className="whitespace-nowrap min-w-[140px]"
                            >
                                {isLoading ? <Loader2 className="animate-spin" size={20} /> : 'Send Request'}
                            </Button>
                        </div>
                    </div>
                </form>

                {status !== 'idle' && (
                    <div className={`mt-4 text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top-2
                        ${status === 'success' ? 'text-emerald-400' : 'text-red-400'}
                    `}>
                        {status === 'success' ? <Check size={16} /> : <ShieldAlert size={16} />}
                        {message}
                    </div>
                )}
            </div>

            <div className="mt-12 text-center opacity-30 pointer-events-none select-none">
                <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent mb-8" />
                <p className="text-zinc-500 text-sm">Waiting for you to build your squad...</p>
            </div>
        </div>
    );
}
