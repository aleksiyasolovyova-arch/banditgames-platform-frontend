import { Button } from '@/components/ui/Button';
import type { Friend } from '@/types/friend.types';
import { Check, X } from 'lucide-react';

interface FriendCardOverlayProps {
    friend: Friend;
    variant: 'friend' | 'request';
}

export function FriendCardOverlay({ friend, variant }: FriendCardOverlayProps) {
    return (
        <div className="flex flex-col justify-end h-full w-full pointer-events-none">
            <div className="relative p-6 bg-gradient-to-t from-black via-black/80 to-transparent pt-16">

                <div className="mb-6">
                    <h3 className="text-3xl font-bold text-white leading-tight drop-shadow-md">
                        {friend.username}
                    </h3>
                </div>

                <div className="flex flex-col gap-3 pointer-events-auto">
                    {variant === 'friend' ? (
                        <>
                            <Button variant="primary" className="w-full shadow-lg shadow-indigo-500/20">
                                INVITE
                            </Button>
                            <Button variant="danger" className="w-full bg-red-500/10 hover:bg-red-500/30 backdrop-blur-sm border border-red-500/20">
                                Remove
                            </Button>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="primary" className="w-full bg-emerald-600 hover:bg-emerald-500 border-emerald-500">
                                <Check size={18} className="mr-2" /> Accept
                            </Button>
                            <Button variant="danger" className="w-full bg-zinc-800 hover:bg-red-900/50 border-zinc-700">
                                <X size={18} className="mr-2" /> Ignore
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}