import { Button } from '@/components/ui/Button';
import TiltedCard from '@/components/ui/TiltedCard';
import { MOCK_FRIENDS } from '@/mockData/friends.ts';
import type { Friend } from '@/types/friend.types.ts';

export function FriendsPage() {
    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-12 pt-10">
            <header className=" mx-auto px-6 mb-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                            Friends List
                        </h1>
                        <p className="text-zinc-400">
                            Manage your connections.
                        </p>
                    </div>

                    <Button variant="white" size="md">
                        + Add Friend
                    </Button>
                </div>
            </header>

            <main className="mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {MOCK_FRIENDS.map((friend) => (
                        <div key={friend.id} className="flex justify-center w-full">
                            <TiltedCard
                                imageSrc={friend.avatarUrl}
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
                                    <FriendCardOverlay friend={friend} />
                                }
                            />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}

//may need eventually to extract it
function FriendCardOverlay({ friend }: { friend: Friend }) {
    return (
        <div className="flex flex-col justify-end h-full w-full pointer-events-none">

            <div className="relative p-6 bg-gradient-to-t from-black via-black/80 to-transparent pt-16">

                <div className="mb-6">
                    <h3 className="text-3xl font-bold text-white leading-tight drop-shadow-md">
                        {friend.username}
                    </h3>
                </div>

                <div className="flex flex-col gap-3 pointer-events-auto">
                    <Button
                        variant="primary"
                        className="w-full shadow-lg shadow-indigo-500/20"
                    >
                        INVITE
                    </Button>

                    <Button
                        variant="danger"
                        className="w-full bg-red-500/80 hover:bg-red-600 backdrop-blur-sm border border-red-500/20"
                    >
                        Remove
                    </Button>
                </div>
            </div>
        </div>
    );
}