import {type Achievement, AchievementType} from '../types/achievement.type.ts';

export const MOCK_ACHIEVEMENTS: Achievement[] = [
    {
        id: 'a1',
        name: 'First Blood',
        description: 'Win your first match',
        pictureUrl: 'https://placehold.co/100',
        type: AchievementType.WIN_COUNT,
        requiredValue: 1
    },
    {
        id: 'a2',
        name: 'Social Butterfly',
        description: 'Add 10 friends',
        pictureUrl: 'https://placehold.co/100',
        type: AchievementType.FRIEND_COUNT,
        requiredValue: 10
    }
];