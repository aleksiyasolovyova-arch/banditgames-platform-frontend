import TiltedCard from '@/components/ui/TiltedCard';
import { FriendCardOverlay } from '@/components/player/FriendCardOverlay';
import {Inbox, Loader2} from 'lucide-react';
import {useFriendRequests} from "@/hooks/player/useFriends.ts";

export function FriendRequestsView() {
    const { data: requests = [], isLoading } = useFriendRequests();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-zinc-500" size={32} />
            </div>
        )
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-20 opacity-50 animate-in fade-in">
                <Inbox size={48} className="mx-auto mb-4" />
                <p>No pending friend requests.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-500">
            {requests.map((friend) => (
                <div key={friend.id} className="flex justify-center w-full">
                    <TiltedCard
                        imageSrc={friend.pictureUrl}
                        altText={friend.username}
                        captionText={friend.username}
                        containerHeight="400px"
                        containerWidth="100%"
                        imageHeight="400px"
                        imageWidth="100%"
                        rotateAmplitude={12}
                        scaleOnHover={1.02}
                        showMobileWarning={false}
                        showTooltip={false}
                        displayOverlayContent={true}
                        overlayContent={
                            <FriendCardOverlay friend={friend} variant="request" />
                        }
                    />
                </div>
            ))}
        </div>
    )
}