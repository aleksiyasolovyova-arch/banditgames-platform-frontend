import { useState } from 'react';
import { Users, Inbox, UserPlus } from 'lucide-react';
import { AllFriendsView } from '@/components/player/AllFriendsView';
import { FriendRequestsView } from '@/components/player/FriendRequestsView';
import { AddFriendView } from '@/components/player/AddFriendView';
import type {Friend, FriendTab} from '@/types/player.types.ts';
import {useFriendRequests} from "@/hooks/player/useFriends.ts";
import {NavButton} from "@/components/ui/FriendsNavButton.tsx";
import {useUserId} from "@/hooks/useKeycloak.tsx";
import {FriendChallengeModal} from "@/components/player/FriendChallengeModal.tsx";

export function FriendsPage() {
    const [activeTab, setActiveTab] = useState<FriendTab>('all');
    const userId = useUserId();
    const { data: requests } = useFriendRequests();
    const [challengingFriend, setChallengingFriend] = useState<Friend | null>(null);

    if (!userId) {
        return (
            <div className="flex items-center justify-center h-screen bg-zinc-950">
                <p className="text-zinc-400">Loading...</p>
            </div>
        );
    }

    const requestCount = requests?.length || 0;
    return (
        <div className="w-full min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-12 pt-10">
            <header className="mx-auto px-6 mb-12 max-w-7xl">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-zinc-800 pb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                            Social Hub
                        </h1>
                        <p className="text-zinc-400">
                            Manage connections and pending requests.
                        </p>
                    </div>

                    <nav className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800 backdrop-blur-sm">
                        <NavButton
                            isActive={activeTab === 'all'}
                            onClick={() => setActiveTab('all')}
                            icon={<Users size={16} />}
                            label="All Friends"
                        />
                        <NavButton
                            isActive={activeTab === 'requests'}
                            onClick={() => setActiveTab('requests')}
                            icon={<Inbox size={16} />}
                            label="Requests"
                            count={requestCount}
                        />
                        <NavButton
                            isActive={activeTab === 'add_friend'}
                            onClick={() => setActiveTab('add_friend')}
                            icon={<UserPlus size={16} />}
                            label="Add Friend"
                            variant="success"
                        />
                    </nav>
                </div>
            </header>

            <main className="mx-auto px-6 max-w-7xl">
                {activeTab === 'all' && <AllFriendsView />}
                {activeTab === 'requests' && <FriendRequestsView />}
                {activeTab === 'add_friend' && <AddFriendView />}
            </main>

            {challengingFriend && (
                <FriendChallengeModal
                    isOpen={!!challengingFriend}
                    friend={challengingFriend}
                    onClose={() => setChallengingFriend(null)}
                />
            )}
        </div>
    );
}