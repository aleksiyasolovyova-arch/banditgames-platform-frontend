import { useKeycloak } from "@/hooks/useKeycloak";

interface PlayerAuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const PlayerAuthModal = ({ isOpen, onClose }: PlayerAuthModalProps) => {
    const { keycloak } = useKeycloak();

    if (!isOpen) return null;

    const handleRegister = () => {
        localStorage.setItem('pending_registration', 'true');
        keycloak?.register({
            redirectUri: window.location.origin + '/games'
        })
    }

    const handleLogin = () => {
        keycloak?.login({
            redirectUri: window.location.origin + '/games'
        })
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-8 rounded-lg max-w-md w-full space-y-4">
                <h2 className="text-2xl font-bold text-white">Player Access</h2>
                <p className="text-zinc-400">Choose an option to continue</p>

                <div className="space-y-3">
                    <button
                        onClick={handleRegister}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold"
                    >
                        Register New Account
                    </button>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-lg font-semibold"
                    >
                        Login
                    </button>
                </div>

                <button
                    onClick={onClose}
                    className="w-full text-zinc-500 hover:text-zinc-400 py-2"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
}
