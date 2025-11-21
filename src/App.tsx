import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { GamesPage } from './pages/GamesPage';
import { LobbyPage } from './pages/LobbyPage';
import { FriendsPage } from './pages/FriendsPage';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<GamesPage />} />
                    <Route path="lobby" element={<LobbyPage />} />
                    <Route path="friends" element={<FriendsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
