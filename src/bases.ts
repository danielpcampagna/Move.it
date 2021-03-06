export interface UserContext {
    user: User;
    challengeContext: ChallengeContext;
    updatedAt?: string;
}

export interface User {
    name: string;
    email: string;
    image: string;
}

export interface ChallengeContext {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}