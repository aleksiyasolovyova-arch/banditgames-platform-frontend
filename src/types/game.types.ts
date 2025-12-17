import type {GameAchievementStub} from "@/types/achievement.type.ts";

export const RegistrationState = {
    PENDING: 'PENDING',
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED'
} as const;

export type RegistrationState = (typeof RegistrationState)[keyof typeof RegistrationState];

export interface Rule {
    description: string;
}

export interface Game {
    id: string; //UUID
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    gameUrl: string;
    gameCreatorName: string;
    registrationState: RegistrationState;
    rules: Rule[];
    achievements: GameAchievementStub[];
}

export interface RegisterGameRequest {
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    gameUrl: string;
    gameCreatorName: string;
    rules: { description: string }[];
    achievements: { code: string; description: string }[];
}

export interface UpdateGameUrlRequest {
    pictureUrl: string;
    gameUrl: string;
}