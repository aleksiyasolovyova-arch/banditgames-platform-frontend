import { Loader2 } from "lucide-react";
import TiltedCard from '@/components/ui/TiltedCard';
import { FriendCardOverlay } from '@/components/player/FriendCardOverlay';
import { useFriendsList } from "@/hooks/player/useFriends";

export function AllFriendsView() {
    const { data: friends, isLoading, isError } = useFriendsList();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-zinc-500" />
            </div>
        );
    }

    if (isError || !friends) {
        return <div className="text-center text-red-400">Failed to load friends.</div>;
    }

    if (friends.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-zinc-400">You don't have any friends yet. Add one to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-500">
            {friends.map((friend) => (
                <div key={friend.id} className="flex justify-center w-full">
                    <TiltedCard
                        imageSrc={friend.pictureUrl}
                        altText={friend.username}
                        captionText={friend.username}
                        containerHeight="420px"
                        containerWidth="100%"
                        imageHeight="420px"
                        imageWidth="100%"
                        rotateAmplitude={8}
                        scaleOnHover={1.03}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={true}
                        overlayContent={
                            <FriendCardOverlay friend={friend} variant="friend" />
                        }
                    />
                </div>
            ))}
        </div>
    );
}
