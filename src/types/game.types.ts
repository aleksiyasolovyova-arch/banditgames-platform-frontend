import type {GameAchievement} from "@/types/achievement.type.ts";

export const RegistrationState = {
    PENDING: 'PENDING',
    PASSED: 'PASSED',
    FAILED: 'FAILED'
} as const;

export type RegistrationState = (typeof RegistrationState)[keyof typeof RegistrationState];

export interface Rule {
    description: string;
}


export interface GameAdmin {
    gameId: string; //UUID
    name: string;
    description: string;
    pictureUrl: string;
    gameUrl: string;
    gameCreatorName: string;
    rules: Rule[];
    achievements: GameAchievement[];
    playableWithAI: boolean;
    pending: true
}

export interface GamePlayer {
    id: string;
    name: string;
    description: string;
    pictureUrl: string;
    gameUrl: string;
    gameCreatorName: string;
    rules: Rule[];
    isFavourite: boolean;
    playableWithAI: boolean;
}

export interface GameUnauthenticated {
    id: string;
    name: string;
    description: string;
    pictureUrl: string;
    gameCreatorName: string;
    rules: Rule[];
    playableWithAI: boolean;
}

export interface RegisterGameRequest {
    name: string;
    description: string;
    pictureUrl: string;
    gameUrl: string;
    gameCreatorName: string;
    rules: { description: string }[];
    gameAchievements: { code: string; description: string }[];
    playableWithAI: boolean;
}

export interface UpdateGameUrlRequest {
    pictureUrl: string;
    gameUrl: string;
}