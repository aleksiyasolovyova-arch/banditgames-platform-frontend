export interface Achievement {
    id: string;
    name: string;
    description: string;
    pictureUrl: string;
    type: AchievementType;
    requiredValue: number;
}

export interface GameAchievement {
    code: string;
    description: string;
    gameId: string;
    gameName: string;
}

export interface CreateAchievementRequest {
    achievementName: string;
    description: string;
    pictureUrl: string;
    achievementType: AchievementType;
    requiredValue: number;
}

export interface GameAchievementStub {
    code: string;
    description: string;
}

export const AchievementType = {
    PLAY_COUNT: 'PLAY_COUNT',     // Unlocked after playing N games
    WIN_COUNT: 'WIN_COUNT',       // Unlocked after winning N games
    FRIEND_COUNT: 'FRIEND_COUNT', // Unlocked after making N friends
    RECORD_TIME: 'RECORD_TIME'    // Unlocked when best time is under N ms
} as const;

export type AchievementType = (typeof AchievementType)[keyof typeof AchievementType];

export const ACHIEVEMENT_TYPES_LABELS: Record<AchievementType, string> = {
    PLAY_COUNT: 'Games Played',
    WIN_COUNT: 'Games Won',
    FRIEND_COUNT: 'Friends Made',
    RECORD_TIME: 'Speed Record (ms)'
};