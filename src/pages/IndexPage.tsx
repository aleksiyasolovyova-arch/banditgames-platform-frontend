import { useNavigate } from "react-router-dom";
import { Gamepad2, Code2, ShieldCheck } from "lucide-react";
import { RoleCard } from "@/components/ui/RoleCard";
import type { RoleConfig, RoleType } from "@/types/user.types";
import {useKeycloak} from "@/hooks/useKeycloak.tsx";
import {PlayerAuthModal} from "@/components/auth/PlayerAuthModal.tsx";
import {useState} from "react";

export const IndexPage = () => {
    const navigate = useNavigate();
    const { keycloak, authenticated } = useKeycloak();
    const [showPlayerModal, setShowPlayerModal] = useState(false);

    const handleRoleSelect = (role: RoleType) => {
        switch (role) {
            case 'player':
                if (authenticated) {
                    navigate('/games');
                } else {
                    setShowPlayerModal(true);
                }
                break;
            case 'developer':
                navigate('/submit-game');
                break;
            case 'admin':
                handleAdminLogin();
                break;
        }
    }

    const handleAdminLogin = async () => {
        if (authenticated) {
            navigate('/admin');
            return;
        }

        if (keycloak) {
            try {
                await keycloak.login({
                    redirectUri: window.location.origin + '/admin'
                });
            } catch (error) {
                console.error("Keycloak login failed", error);
            }
        } else {
            console.error("Keycloak instance is missing.");
        }
    }

    const roles: RoleConfig[] = [
        {
            id: 'player',
            title: "Player",
            description: "Explore the arcade, play games, unlock achievements, and climb the global leaderboards.",
            icon: <Gamepad2 className="w-8 h-8" />,
            actionLabel: "Enter Arcade",
            theme: 'indigo'
        },
        {
            id: 'developer',
            title: "Developer",
            description: "Submit new games to the platform, manage your assets, and view integration documentation.",
            icon: <Code2 className="w-8 h-8" />,
            actionLabel: "Submit Game",
            theme: 'emerald'
        },
        {
            id: 'admin',
            title: "Administrator",
            description: "Access system moderation tools, user management, and platform configuration settings.",
            icon: <ShieldCheck className="w-8 h-8" />,
            actionLabel: authenticated ? "Go to Dasboard" : "SSO LOGIN",
            theme: 'rose',
            isRestricted: true
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

            <main className="z-10 w-full max-w-6xl space-y-12">

                <div className="text-center space-y-4 animate-in slide-in-from-top-4 fade-in duration-700">
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Path</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Welcome to the platform. Select your role below to access the games library, developer tools, or administration console.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-backwards delay-150">
                    {roles.map((role) => (
                        <RoleCard
                            key={role.id}
                            config={role}
                            onClick={handleRoleSelect}
                        />
                    ))}
                </div>

                <PlayerAuthModal
                    isOpen={showPlayerModal}
                    onClose={() => setShowPlayerModal(false)}
                />
            </main>
        </div>
    );
};
