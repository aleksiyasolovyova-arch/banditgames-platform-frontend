//Temporary data file, before the implementation of the API

import {type GameAdmin, type GamePlayer, type GameUnauthenticated, RegistrationState} from '../types/game.types.ts';

export const MOCK_GAMES_ADMIN: GameAdmin[] = [
    {
        gameId: '2b692bc6-973d-493b-a43f-6665fb2ea404',
        name: 'Cyber Punk 2088',
        description: 'A futuristic RPG awaiting approval. Check the buttons!',
        pictureUrl: 'https://placehold.co/600x400/222222/FFF?text=Pending',
        gameUrl: 'https://game.com/cyber',
        gameCreatorName: 'Dev Studio One',
        registrationState: RegistrationState.PENDING, // <--- Key for testing buttons
        rules: [{ description: 'No cheating' }],
        achievements: [{ code: 'FIRST_VICTORY', description: 'Smth Smth first victory yeah' }],
        playableWithAI: false
    },
    {
        gameId: '5e66169c-ca6a-4ebe-bac7-529e49df9d55',
        name: 'Fantasy Quest Online',
        description: 'This game is already live. Buttons should be hidden.',
        pictureUrl: 'https://placehold.co/600x400/228B22/FFF?text=Accepted',
        gameUrl: 'https://fantasy.com',
        gameCreatorName: 'Indie Dev',
        registrationState: RegistrationState.PASSED, // <--- Key for testing badges
        rules: [{ description: 'Be nice' }],
        achievements: [],
        playableWithAI:true
    },
    {
        gameId: 'e2552a7f-ee75-4096-94ae-e84f10019c07',
        name: 'Broken Game',
        description: 'This game was rejected due to bugs.',
        pictureUrl: 'https://placehold.co/600x400/8B0000/FFF?text=Rejected',
        gameUrl: 'https://badgame.com',
        gameCreatorName: 'Spammer',
        registrationState: RegistrationState.FAILED,
        rules: [],
        achievements: [],
        playableWithAI:false
    },
    {
        gameId: '5e66169c-ca6a-4ebe-bac7-529e49df9d55',
        name: 'Fantasy Quest Online',
        description: 'Explore a vast world, fight dragons, and build your legend in this MMORPG.',
        pictureUrl: 'https://img.goodfon.com/wallpaper/big/d/1f/mountain-fantasy-artwork-wizard-fantasy.webp',
        gameUrl: 'https://fantasy.com',
        gameCreatorName: 'Indie Dev',
        registrationState: RegistrationState.PASSED,
        rules: [{ description: 'Be nice to other players' }],
        achievements: [],
        playableWithAI: false
    },
    {
        gameId: 'ac772949-fe12-4c58-8521-602dbb844e50',
        name: 'Neon Drift 2000',
        description: 'High-octane synthwave racing. Compete for the fastest lap times on the leaderboard.',
        pictureUrl: 'https://static.cdprojektred.com/cms.cdprojektred.com/16x9_big/872822c5e50dc71f345416098d29fc3ae5cd26c1-1280x720.jpg',
        gameUrl: 'https://neondrift.game',
        gameCreatorName: 'Turbo Studios',
        registrationState: RegistrationState.PASSED,
        rules: [{ description: 'No cheating' }, { description: 'Fair play' }],
        achievements: [],
        playableWithAI: true
    },
    {
        gameId: 'e8e35784-6194-4dbf-af1e-3ae9d2384c33',
        name: 'Cosmic Logic',
        description: 'Relaxing space-themed puzzles to train your brain.',
        pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7i2kLvAFDPWsNCh-8E3P_SxP6AE2oIth9pQ&s',
        gameUrl: 'https://cosmiclogic.app',
        gameCreatorName: 'Brain Tease Ltd',
        registrationState: RegistrationState.PASSED,
        rules: [],
        achievements: [],
        playableWithAI: false
    },
    {
        gameId: '520a5896-7d07-4352-b148-c629f80122f8',
        name: 'Galactic Marine',
        description: 'The ultimate space shooter experience with 4K graphics.',
        pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/NGC_4414_%28NASA-med%29.jpg',
        gameUrl: 'https://galacticmarine.com',
        gameCreatorName: 'AAA Games Corp',
        registrationState: RegistrationState.PASSED,
        rules: [],
        achievements: [],
        playableWithAI: false
    }
]

export const MOCK_GAMES_USER: GamePlayer[] = [
    {
        id: '5e66169c-ca6a-4ebe-bac7-529e49df9d55',
        name: 'Fantasy Quest Online',
        description: 'Explore a vast world, fight dragons, and build your legend in this MMORPG.',
        pictureUrl: 'https://img.goodfon.com/wallpaper/big/d/1f/mountain-fantasy-artwork-wizard-fantasy.webp',
        gameUrl: 'https://fantasy.com',
        gameCreatorName: 'Indie Dev',
        rules: [{ description: 'Be nice to other players' }],
        isFavourite:false,
        playableWithAI: false
    },
    {
        id: 'ac772949-fe12-4c58-8521-602dbb844e50',
        name: 'Neon Drift 2000',
        description: 'High-octane synthwave racing. Compete for the fastest lap times on the leaderboard.',
        pictureUrl: 'https://static.cdprojektred.com/cms.cdprojektred.com/16x9_big/872822c5e50dc71f345416098d29fc3ae5cd26c1-1280x720.jpg',
        gameUrl: 'https://neondrift.game',
        gameCreatorName: 'Turbo Studios',
        rules: [{ description: 'No cheating' }, { description: 'Fair play' }],
        isFavourite: false,
        playableWithAI: true
    },
    {
        id: 'e8e35784-6194-4dbf-af1e-3ae9d2384c33',
        name: 'Cosmic Logic',
        description: 'Relaxing space-themed puzzles to train your brain.',
        pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7i2kLvAFDPWsNCh-8E3P_SxP6AE2oIth9pQ&s',
        gameUrl: 'https://cosmiclogic.app',
        gameCreatorName: 'Brain Tease Ltd',
        rules: [],
        isFavourite:false,
        playableWithAI: false
    },
    {
        id: '520a5896-7d07-4352-b148-c629f80122f8',
        name: 'Galactic Marine',
        description: 'The ultimate space shooter experience with 4K graphics.',
        pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/NGC_4414_%28NASA-med%29.jpg',
        gameUrl: 'https://galacticmarine.com',
        gameCreatorName: 'AAA Games Corp',
        rules: [],
        isFavourite:true,
        playableWithAI: false
    }
]

export const MOCK_GAMES_UNAUTHENTICATED: GameUnauthenticated[] = [
    {
        id: '5e66169c-ca6a-4ebe-bac7-529e49df9d55',
        name: 'Fantasy Quest Online',
        description: 'Explore a vast world, fight dragons, and build your legend in this MMORPG.',
        pictureUrl: 'https://img.goodfon.com/wallpaper/big/d/1f/mountain-fantasy-artwork-wizard-fantasy.webp',
        gameCreatorName: 'Indie Dev',
        rules: [{ description: 'Be nice to other players' }],
        playableWithAI: false
    },
    {
        id: 'ac772949-fe12-4c58-8521-602dbb844e50',
        name: 'Neon Drift 2000',
        description: 'High-octane synthwave racing. Compete for the fastest lap times on the leaderboard.',
        pictureUrl: 'https://static.cdprojektred.com/cms.cdprojektred.com/16x9_big/872822c5e50dc71f345416098d29fc3ae5cd26c1-1280x720.jpg',
        gameCreatorName: 'Turbo Studios',
        rules: [{ description: 'No cheating' }, { description: 'Fair play' }],
        playableWithAI: true
    },
    {
        id: 'e8e35784-6194-4dbf-af1e-3ae9d2384c33',
        name: 'Cosmic Logic',
        description: 'Relaxing space-themed puzzles to train your brain.',
        pictureUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7i2kLvAFDPWsNCh-8E3P_SxP6AE2oIth9pQ&s',
        gameCreatorName: 'Brain Tease Ltd',
        rules: [],
        playableWithAI: false
    },
    {
        id: '520a5896-7d07-4352-b148-c629f80122f8',
        name: 'Galactic Marine',
        description: 'The ultimate space shooter experience with 4K graphics.',
        pictureUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/NGC_4414_%28NASA-med%29.jpg',
        gameCreatorName: 'AAA Games Corp',
        rules: [],
        playableWithAI: false
    }
]