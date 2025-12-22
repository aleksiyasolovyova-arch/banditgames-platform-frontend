import {type PlatformAchievement, AchievementType, type GameAchievement} from '../types/achievement.type.ts';

export const MOCK_PLATFORM_ACHIEVEMENTS: PlatformAchievement[] = [
    {
        id: 'p1',
        name: 'Social Butterfly',
        description: 'Add 10 friends to your network',
        pictureUrl: 'https://placehold.co/100',
        type: AchievementType.FRIEND_COUNT,
        requiredValue: 10
    },
    {
        id: 'p2',
        name: 'Veteran Player',
        description: 'Play 100 matches across all games',
        pictureUrl: 'https://placehold.co/100',
        type: AchievementType.PLAY_COUNT,
        requiredValue: 100
    },
    {
        id: 'p3',
        name: 'Winner',
        description: 'Win 50 matches',
        pictureUrl: 'https://placehold.co/100',
        type: AchievementType.WIN_COUNT,
        requiredValue: 50
    }
]

export const MOCK_GAME_ACHIEVEMENTS: GameAchievement[] = [
    {
        code: 'FIRST_VICTORY',
        description: 'Win your first match in this game',
        gameId: 'g1',
        gameName: 'CyberPunk 2088'
    },
    {
        code: 'PERFECT_GAME',
        description: 'Complete a match without losing a single piece',
        gameId: 'g3',
        gameName: 'Fantasy Quest Online'
    },
    {
        code: 'SPEED_DEMON',
        description: 'Win a match in under 5 minutes',
        gameId: 'g2',
        gameName: 'Broken Game'
    }
]

export const MOCK_USER_PROGRESS = {
    friendCount: 5,
    matchCount: 25,
    winCount: 12
}

// User's unlocked game achievements (codes)
export const MOCK_UNLOCKED_GAME_ACHIEVEMENTS = [
    'FIRST_VICTORY',
    'SPEED_DEMON'
]

// Helper type for platform achievements with progress
export interface PlatformAchievementWithProgress extends PlatformAchievement {
    currentValue: number;
    isUnlocked: boolean;
}

// Helper type for game achievements with unlock status
export interface GameAchievementWithStatus extends GameAchievement {
    isUnlocked: boolean;
}