import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useSession } from 'next-auth/client';

import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';
import axios from 'axios';
import { User, ChallengeContext, UserContext } from '../bases';

interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted: number,
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [ level, setLevel ] = useState(rest.level ?? 1);
    const [ currentExperience, setCurrentExperience ] = useState(rest.currentExperience ?? 0);
    const [ challengesCompleted, setChallengesCompleted ] = useState(rest.challengesCompleted ?? 0);

    const [ session, loading ] = useSession();

    const [ activeChallenge, setActiveChallenge ] = useState(null);
    const [ isLevelUpModalOpen, setIsLevelUpModalOpen ] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
        saveUserContext();
    }, [level, currentExperience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play();

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);
    }

    function saveUserContext() {
        const { name, email, image } = session.user;
        const id = name;
        const user: User = {
            name,
            email,
            image,
        }
        const challengeContext: ChallengeContext = {
            level,
            currentExperience,
            challengesCompleted,
        }
        axios.post(`/api/users/${id}`, {
            user,
            challengeContext
        })
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal,
            }}
        >
            {children}

        { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}