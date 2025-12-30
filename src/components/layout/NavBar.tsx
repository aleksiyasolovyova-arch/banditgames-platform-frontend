import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKeycloak } from "@/hooks/useKeycloak";
import { usePlayerNavBar } from "@/hooks/player/usePlayer";
import GooeyNav from './GooeyNav';
import { Button } from "@/components/ui/Button.tsx";
import { LogOut, User } from "lucide-react";

const baseItems = [
    { label: "Games", href: "/games" },
    { label: "Friends", href: "/friends" },
    { label: "Achievements", href: "/achievements" }
];

export const Navbar = () => {
    const { keycloak, authenticated } = useKeycloak();
    const { data: player } = usePlayerNavBar();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        keycloak?.logout({ redirectUri: window.location.origin + '/' });
    };

    const handleProfileClick = () => {
        setIsMenuOpen(false);
        navigate('/profile');
    };

    const items = authenticated && player
        ? [
            ...baseItems,
            {
                label: player.username,
                href: "#",
                image: player.pictureUrl,
                onClick: (e: React.MouseEvent<HTMLElement>) => {
                    e.preventDefault();
                    setIsMenuOpen(!isMenuOpen);
                }
            }
        ]
        : baseItems;

    return (
        <div className="h-[120px] relative flex items-center justify-center z-50">
            <div className="relative">
                <GooeyNav items={items} />

                {isMenuOpen && player && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                        <div className="absolute right-0 top-16 mt-2 w-56 bg-zinc-900 rounded-xl shadow-2xl border border-zinc-800 p-2 z-20 animate-in slide-in-from-top-2 duration-200">

                            <div className="px-3 py-2 border-b border-zinc-800 mb-2">
                                <p className="text-sm font-bold text-white truncate">{player.username}</p>
                                <p className="text-xs text-zinc-500">Online</p>
                            </div>

                            <Button
                                onClick={handleProfileClick}
                                className="w-full justify-start text-zinc-300 hover:text-white hover:bg-zinc-800 mb-1"
                            >
                                <User size={16} className="mr-2" /> My Profile
                            </Button>

                            <Button
                                onClick={handleLogout}
                                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950/30"
                            >
                                <LogOut size={16} className="mr-2" /> Logout
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};