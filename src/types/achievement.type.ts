export type AchievementCategory = 'game' | 'platform';


export interface Achievement {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    isUnlocked: boolean;
    dateUnlocked?: string;
    category: AchievementCategory;
}