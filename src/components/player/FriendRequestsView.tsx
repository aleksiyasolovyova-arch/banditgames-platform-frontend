import { Loader2 } from "lucide-react";
import TiltedCard from '@/components/ui/TiltedCard';
import { FriendCardOverlay } from '@/components/player/FriendCardOverlay';
import { useFriendRequests } from "@/hooks/player/useFriends";

export function FriendRequestsView() {
    const { data: requests, isLoading, isError } = useFriendRequests();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-zinc-500" />
            </div>
        );
    }

    if (isError || !requests) {
        return <div className="text-center text-red-400">Failed to load friend requests.</div>;
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-zinc-400">No pending friend requests</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-500">
            {requests.map((request) => (
                <div key={request.id} className="flex justify-center w-full">
                    <TiltedCard
                        imageSrc={request.pictureUrl}
                        altText={request.username}
                        captionText={request.username}
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
                            <FriendCardOverlay friend={request} variant="request" />
                        }
                    />
                </div>
            ))}
        </div>
    );
}
