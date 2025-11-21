import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export function FriendsPage() {
    const mockFriends = [
        { id: 1, username: 'PlayerOne', isOnline: true },
        { id: 2, username: 'GameMaster', isOnline: false },
        { id: 3, username: 'ChessKing', isOnline: true },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Friends</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockFriends.map((friend) => (
                    <Card key={friend.id}>
                        <div className="flex items-center space-x-3 mb-3">
                            <div className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold">
                                {friend.username[0]}
                            </div>
                            <div>
                                <h3 className="font-bold">{friend.username}</h3>
                                <span
                                    className={`text-sm ${
                                        friend.isOnline
                                            ? 'text-difficulty-easy'
                                            : 'text-brand-secondary'
                                    }`}
                                >
                  {friend.isOnline ? '🟢 Online' : '⚫ Offline'}
                </span>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" className="w-full">
                            Invite to Game
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
