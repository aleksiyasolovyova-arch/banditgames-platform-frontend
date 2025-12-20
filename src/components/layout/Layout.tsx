import {Outlet, useLocation} from 'react-router-dom';
import  GooeyNav  from '@/components/layout/GooeyNav.tsx';
import {useKeycloak} from "@/hooks/useKeycloak.tsx";
// import PixelBlast from "@/components/ui/PixelBlast.tsx";


const baseItems = [

    { label: "Games", href: "/" },

    { label: "Friends", href: "/friends" },

    { label: "Achievements", href: "/achievements" },
    { label: "Submit Game", href: "/submit-game" },
    { label: "Admin", href: "/admin" }


]

export function Layout() {
    const location = useLocation();
    const { keycloak, authenticated } = useKeycloak();

    const  hiddenRoutes = ["/admin", "/submit-game"]


    const shouldShowNavbar = !hiddenRoutes.some(route =>
        location.pathname.startsWith(route)
    )

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
            //TODO: make this look good
            {/*<div className="fixed inset-0 z-0">*/}
            {/*    <PixelBlast*/}
            {/*        variant="square"*/}
            {/*        pixelSize={6}*/}
            {/*        color="#B19EEF"*/}
            {/*        patternScale={3}*/}
            {/*        patternDensity={1.2}*/}
            {/*        pixelSizeJitter={0.5}*/}

            {/*        enableRipples={true}*/}
            {/*        rippleSpeed={0.5}*/}
            {/*        rippleThickness={0.1}*/}
            {/*        rippleIntensityScale={1.5}*/}

            {/*        liquid={true}*/}
            {/*        liquidStrength={0.12}*/}
            {/*        liquidRadius={1.2}*/}
            {/*        liquidWobbleSpeed={5}*/}
            {/*        speed={0.2}*/}

            {/*        edgeFade={0}*/}
            {/*        transparent={true}*/}
            {/*        noiseAmount={0.05}*/}
            {/*    />*/}
            {/*</div>*/}
            <div className="h-[200px] relative flex items-center justify-center">
                {shouldShowNavbar && <GooeyNav items={items} />}
        </div>
            <main className="w-full px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
}
