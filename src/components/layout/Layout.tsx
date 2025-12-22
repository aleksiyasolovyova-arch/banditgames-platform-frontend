import {Outlet, useLocation} from 'react-router-dom';
import  GooeyNav  from '@/components/layout/GooeyNav.tsx';
import {useKeycloak} from "@/hooks/useKeycloak.tsx";


const baseItems = [

    { label: "Games", href: "/games" },

    { label: "Friends", href: "/friends" },

    { label: "Achievements", href: "/achievements" }


]

export function Layout() {
    const location = useLocation();
    const { keycloak, authenticated } = useKeycloak();

    const  hiddenRoutes = ["/admin", "/submit-game"]

    const isNavbarHidden =
        location.pathname === "/" ||
        hiddenRoutes.some(prefix => location.pathname.startsWith(prefix))

    const handleLogout = () => {
        keycloak?.logout({
            redirectUri: window.location.origin + '/'
        })
    }

    const items = authenticated
        ? [...baseItems, { label: "Logout", href: "#", onClick: handleLogout }]
        : baseItems

    return (
        <div className="min-h-screen bg-background-primary">
            {!isNavbarHidden && (
                <div className="h-[200px] relative flex items-center justify-center">
                    <GooeyNav items={items} />
                </div>
            )}
            <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}
