import { Button } from '@/components/ui/Button';
import type { Friend, FriendRequest } from '@/types/friend.types';
import { useAcceptFriendship, useDeclineFriendship, useEndFriendship } from '@/hooks/player/useFriends';
import { Check, X, Loader2 } from 'lucide-react';

interface FriendCardOverlayProps {
    friend: Friend | FriendRequest;
    variant: 'friend' | 'request';
}

export function FriendCardOverlay({ friend, variant }: FriendCardOverlayProps) {
    const acceptMutation = useAcceptFriendship();
    const declineMutation = useDeclineFriendship();
    const endMutation = useEndFriendship();

    const handleAccept = () => {
        acceptMutation.mutate(friend.friendshipId);
    };

    const handleDecline = () => {
        declineMutation.mutate(friend.friendshipId);
    };

    const handleRemove = () => {
        endMutation.mutate(friend.friendshipId);
    };

    const isLoading = acceptMutation.isPending || declineMutation.isPending || endMutation.isPending;

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
                            <Button
                                variant="primary"
                                className="w-full shadow-lg shadow-indigo-500/20"
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin mr-2" /> : null}
                                INVITE
                            </Button>
                            <Button
                                variant="danger"
                                className="w-full bg-red-500/10 hover:bg-red-500/30 backdrop-blur-sm border border-red-500/20"
                                onClick={handleRemove}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader2 size={18} className="animate-spin mr-2" /> : null}
                                Remove
                            </Button>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="primary"
                                className="w-full bg-emerald-600 hover:bg-emerald-500 border-emerald-500"
                                onClick={handleAccept}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <Check size={18} className="mr-2" />
                                )}
                                Accept
                            </Button>
                            <Button
                                variant="danger"
                                className="w-full bg-zinc-800 hover:bg-red-900/50 border-zinc-700"
                                onClick={handleDecline}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader2 size={18} className="animate-spin" />
                                ) : (
                                    <X size={18} className="mr-2" />
                                )}
                                Ignore
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
