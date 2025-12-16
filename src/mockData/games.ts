//Temporary data file, before the implementation of the API

import {type Game, RegistrationState} from '../types/game.types.ts';

export const MOCK_GAMES: Game[] = [
    {
        id: 'g1',
        name: 'Cyber Punk 2088',
        description: 'A futuristic RPG awaiting approval. Check the buttons!',
        price: 59.99,
        pictureUrl: 'https://placehold.co/600x400/222222/FFF?text=Pending',
        gameUrl: 'https://game.com/cyber',
        gameCreatorName: 'Dev Studio One',
        registrationState: RegistrationState.PENDING, // <--- Key for testing buttons
        rules: [{ description: 'No cheating' }],
        achievements: [{ code: 'a1', description: 'First Blood' }]
    },
    {
        id: 'g2',
        name: 'Fantasy Quest Online',
        description: 'This game is already live. Buttons should be hidden.',
        price: 0,
        pictureUrl: 'https://placehold.co/600x400/228B22/FFF?text=Accepted',
        gameUrl: 'https://fantasy.com',
        gameCreatorName: 'Indie Dev',
        registrationState: RegistrationState.ACCEPTED, // <--- Key for testing badges
        rules: [{ description: 'Be nice' }],
        achievements: []
    },
    {
        id: 'g3',
        name: 'Broken Game',
        description: 'This game was rejected due to bugs.',
        price: 10.00,
        pictureUrl: 'https://placehold.co/600x400/8B0000/FFF?text=Rejected',
        gameUrl: 'https://badgame.com',
        gameCreatorName: 'Spammer',
        registrationState: RegistrationState.REJECTED,
        rules: [],
        achievements: []
    }
];