import type{ ReactNode } from "react";

export type RoleType = 'player' | 'developer' | 'admin';

export type RoleTheme = 'indigo' | 'emerald' | 'rose';

export interface RoleConfig {
    id: RoleType;
    title: string;
    description: string;
    icon: ReactNode;
    actionLabel: string;
    theme: RoleTheme;
    isRestricted?: boolean; // For the admin badge
}

export interface RoleCardProps {
    config: RoleConfig;
    onClick: (role: RoleType) => void;
}
