import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { GamesPage } from '@/pages/GamesPage';
import { FriendsPage } from '@/pages/FriendsPage';
import {AchievementsPage} from "@/pages/AchievementsPage.tsx";
import {KeycloakProvider} from "@/context/KeycloakProvider.tsx";
function App() {
    return (
        <KeycloakProvider>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<GamesPage />} />
                    <Route path="achievements" element={<AchievementsPage />} />
                    <Route path="friends" element={<FriendsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
        </KeycloakProvider>
    );
}

export default App;
