import {Outlet, useLocation} from 'react-router-dom';
import  GooeyNav  from '@/components/layout/GooeyNav.tsx';
import {useKeycloak} from "@/hooks/useKeycloak.tsx";
import {usePlayer} from "@/hooks/player/usePlayer.ts";
import {ChangePictureModal} from "@/components/player/ChangePictureModal.tsx";
import {useState} from "react";
import {Button} from "@/components/ui/Button.tsx";


const baseItems = [

    { label: "Games", href: "/games" },

    { label: "Friends", href: "/friends" },

    { label: "Achievements", href: "/achievements" }


]

export function Layout() {
    const location = useLocation();
    const { keycloak, authenticated } = useKeycloak();
    const { data: player } = usePlayer();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const  hiddenRoutes = ["/admin", "/submit-game"]

    const isNavbarHidden =
        location.pathname === "/" ||
        hiddenRoutes.some(prefix => location.pathname.startsWith(prefix))

    const handleLogout = () => {
        keycloak?.logout({
            redirectUri: window.location.origin + '/'
        })
    }

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
        <div className="min-h-screen bg-background-primary">
            {!isNavbarHidden && (
                <div className="h-[120px] relative flex items-center justify-center">
                    {/* The relative container allows absolute positioning of the dropdown */}
                    <div className="relative">
                        <GooeyNav items={items} />

                        {isMenuOpen && (
                            <>
                                {/* Invisible backdrop to close on click outside */}
                                <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />

                                <div className="absolute right-0 mt-4 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-white/10 p-2 z-20 animate-in fade-in zoom-in duration-150">
                                    <Button
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setIsMenuOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                                    >
                                         Change Picture
                                    </Button>
                                    <Button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition"
                                    >
                                         Logout
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>

            {player && (
                <ChangePictureModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    currentPictureUrl={player.pictureUrl}
                    username={player.username}
                />
            )}
        </div>
    )
}
