import {Outlet, useLocation} from 'react-router-dom';
import {Navbar} from "@/components/layout/NavBar.tsx";


export function Layout() {
    const location = useLocation();
    const hiddenRoutes = ["/admin", "/submit-game"];

    const isNavbarHidden =
        location.pathname === "/" ||
        hiddenRoutes.some(prefix => location.pathname.startsWith(prefix));

    return (
        <div className="min-h-screen bg-background-primary">
            {!isNavbarHidden && <Navbar />}

            <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}