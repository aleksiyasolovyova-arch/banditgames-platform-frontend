import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function LobbyPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Game Lobby</h1>

            <Card>
                <h2 className="text-xl font-bold mb-4">Waiting Room</h2>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center p-3 bg-background-secondary rounded">
                        <span className="font-medium">You</span>
                        <span className="px-3 py-1 bg-status-success-light text-difficulty-easy rounded text-sm font-medium">
              Ready
            </span>
                    </div>

                    <div className="flex justify-center items-center p-3 bg-background-secondary rounded">
                        <span className="text-brand-secondary">Waiting for opponent...</span>
                    </div>
                </div>

                <Button variant="danger" className="w-full">
                    Leave Lobby
                </Button>
            </Card>
        </div>
    );
}