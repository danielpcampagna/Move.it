import { useSession } from 'next-auth/client';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

export function Profile() {
    const { level } = useContext(ChallengesContext);
    const [ session, loading ] = useSession()

    return (
        <>
            { loading ? (
                <div className={styles.loader}></div>
            ) : (
                <div className={styles.profileContainer}>
                    <img src={session.user.image} alt={session.user.name} />
                    <div>
                        <strong>{session.user.name}</strong>
                        <p>
                            <img src="icons/level.svg" alt="Level"/>
                            level {level}
                        </p>
                    </div>
                </div>
            )}
        </>
    )
}