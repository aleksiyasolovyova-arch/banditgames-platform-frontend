import type { Achievement } from '../types/achievement.type.ts';

export const MOCK_ACHIEVEMENTS: Achievement[] = [
    {
        id: '1',
        title: 'First Blood',
        description: 'Win your first game in any category.',
        imageUrl: 'https://images.unsplash.com/photo-1533518463841-d62e1fc91373?w=400&q=80',
        isUnlocked: true,
        dateUnlocked: 'Oct 12, 2023'
    },
    {
        id: '2',
        title: 'Grandmaster',
        description: 'Win 10 games of Chess in a row without losing.',
        imageUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400&q=80',
        isUnlocked: false, // Locked
    },
    {
        id: '3',
        title: 'Speed Demon',
        description: 'Complete a game of Connect Four in under 1 minute.',
        imageUrl: 'https://images.unsplash.com/photo-1614713568397-b30b7e6d20cc?w=400&q=80',
        isUnlocked: true,
        dateUnlocked: 'Nov 01, 2023'
    },
    {
        id: '4',
        title: 'Social Butterfly',
        description: 'Add 5 friends to your friends list.',
        imageUrl: 'https://images.unsplash.com/photo-1511632765486-a4a920224e5f?w=400&q=80',
        isUnlocked: false,
    },
    {
        id: '5',
        title: 'Sharpshooter',
        description: 'Win a game with 100% accuracy.',
        imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80',
        isUnlocked: true,
        dateUnlocked: 'Dec 05, 2023'
    },
    {
        id: '6',
        title: 'Marathoner',
        description: 'Play games for a total of 24 hours.',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&q=80',
        isUnlocked: false,
    }
];