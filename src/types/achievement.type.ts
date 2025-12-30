export const AchievementType = {
    PLAY_COUNT: 'PLAY_COUNT',
    WIN_COUNT: 'WIN_COUNT',
    FRIEND_COUNT: 'FRIEND_COUNT',
    RECORD_TIME: 'RECORD_TIME'
} as const;

export type AchievementType = 'PLAY_COUNT' | 'WIN_COUNT' | 'FRIEND_COUNT' | 'RECORD_TIME';

export const ACHIEVEMENT_TYPES_LABELS: Record<string, string> = {
    PLAY_COUNT: 'Games Played',
    WIN_COUNT: 'Games Won',
    FRIEND_COUNT: 'Friends Made',
    RECORD_TIME: 'Speed Record (ms)'
};

export interface PlatformAchievement {
    achievementId: string;
    name: string;
    description: string;
    pictureUrl: string;
    type: AchievementType;
    requiredValue: number;
    unlockedAt?: string | null;
}

export interface GameAchievement {
    gameId: string;
    gameName: string;
    pictureUrl: string; // The game's picture
    code: string;
    description: string;
    unlockedAt: string | null;
}

export interface PlayerAchievementsDto {
    platformAchievements: PlatformAchievement[];
    gameAchievements: GameAchievement[];
}

export interface CreateAchievementRequest {
    name: string;
    description: string;
    pictureUrl: string;
    achievementType: AchievementType;
    requiredValue: number;
}