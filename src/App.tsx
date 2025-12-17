import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { GamesPage } from '@/pages/GamesPage';
import { FriendsPage } from '@/pages/FriendsPage';
import {AchievementsPage} from "@/pages/AchievementsPage.tsx";
import {KeycloakProvider} from "@/context/KeycloakProvider.tsx";
import {AdminDashboardPage} from "@/pages/admin/AdminDashboardPage.tsx";
import {CreateGamePage} from "@/pages/developer/CreateGamePage.tsx";
function App() {
    return (
        <KeycloakProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route index element={<GamesPage />} />
                    <Route path="/submit-game" element={<CreateGamePage />} />                    <Route path="achievements" element={<AchievementsPage />} />
                    <Route path="friends" element={<FriendsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </KeycloakProvider>
    );
}

export default App;
