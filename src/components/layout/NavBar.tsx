import { useState } from 'react';
import { useKeycloak } from "@/hooks/useKeycloak";
import { usePlayer } from "@/hooks/player/usePlayer";
import GooeyNav from './GooeyNav';
import { ChangePictureModal } from "@/components/player/ChangePictureModal";
import {Button} from "@/components/ui/Button.tsx";

const baseItems = [
    { label: "Games", href: "/games" },
    { label: "Friends", href: "/friends" },
    { label: "Achievements", href: "/achievements" }
];

export const Navbar = () => {
    const { keycloak, authenticated } = useKeycloak();
    const { data: player } = usePlayer();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = () => {
        keycloak?.logout({ redirectUri: window.location.origin + '/' });
    };

    const items = authenticated && player
        ? [
            ...baseItems,
            {
                label: player.username,
                href: "#profile",
                image: player.pictureUrl,
                onClick: () => setIsMenuOpen(!isMenuOpen)
            }
        ]
        : baseItems;

    return (
        <div className="h-[120px] relative flex items-center justify-center">
            <div className="relative">
                <GooeyNav items={items} />

                {isMenuOpen && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                        <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-white/10 p-2 z-20">
                            <Button onClick={() => { setIsModalOpen(true); setIsMenuOpen(false); }} className="...">
                                Change Picture
                            </Button>
                            <Button onClick={handleLogout} className="...">
                                Logout
                            </Button>
                        </div>
                    </>
                )}
            </div>

            {player && (
                <ChangePictureModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    currentPictureUrl={player.pictureUrl}
                    username={player.username}
                />
            )}
        </div>
    );
};