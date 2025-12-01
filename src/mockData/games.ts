//Temporary data file, before the implementation of the API

import type { Game } from '../types/game.types.ts';

export const MOCK_GAMES: Game[] = [
    {
        id: 1,
        title: 'Tic-Tac-Toe',
        description: 'The classic strategy. 3-in-a-row wins.',
        image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800&q=80',
        tags: ['Strategy', 'Casual'],
    },
    {
        id: 2,
        title: 'Connect Four',
        description: 'Drop discs. Connect vertically or diagonally.',
        image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=800&q=80',
        tags: ['Board', 'Family'],
    },
    {
        id: 3,
        title: 'Chess Master',
        description: 'Checkmate your opponent in the ultimate duel.',
        image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80',
        tags: ['Brain', 'Competitive'],
    },
    {
        id: 4,
        title: 'Cyber Circuit',
        description: 'Navigate the neon grid in this fast-paced racer.',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
        tags: ['Action', 'Racing'],
    },
    {
        id: 5,
        title: 'Space Odyssey',
        description: 'Explore the unknown depths of the universe.',
        image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
        tags: ['Sci-Fi', 'Adventure'],
    },
];