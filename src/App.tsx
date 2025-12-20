import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { GamesPage } from '@/pages/GamesPage';
import { FriendsPage } from '@/pages/FriendsPage';
import {AchievementsPage} from "@/pages/AchievementsPage.tsx";
import {KeycloakProvider} from "@/context/KeycloakProvider.tsx";
import {AdminDashboardPage} from "@/pages/admin/AdminDashboardPage.tsx";
import {CreateGamePage} from "@/pages/developer/CreateGamePage.tsx";
import {IndexPage} from "@/pages/IndexPage.tsx";
function App() {
    return (
        <KeycloakProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/games" element={<GamesPage />} />
                    <Route index element={<IndexPage />} />
                    <Route path="/submit-game" element={<CreateGamePage />} />
                    <Route path="achievements" element={<AchievementsPage />} />
                    <Route path="friends" element={<FriendsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </KeycloakProvider>
    );
}

export default App;
