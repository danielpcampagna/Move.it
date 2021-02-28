import { useState } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/pages/Ranking.module.css';

import ranking from '../../ranking.json';

interface ItemProps {
    position: number;
    user: {
        name: string;
        level: number;
        challengesCompleted: number;
        experience: number;
        picture: string;
    };
}

export default function Ranking() {
    const [ items, setItems ] = useState<ItemProps[]>(ranking);

    return (
        <Navbar>
            <div className={styles.rankingContainer}>
                <header>
                    <h1>Leaderboard</h1>
                </header>

                <div className={styles.grid}>
                    <div className={styles.header}>Posição</div>
                    <div className={styles.header} style={{ marginLeft: '1.75rem' }}>Usuário</div>
                    <div className={styles.header}>Desafios</div>
                    <div className={styles.header}>Experiência</div>

                    {items.map((item, i) => (
                        <>
                            <div className={styles.firstCell}>{item.position}</div>
                            <div className={`${styles.cell} ${styles.user}`}>
                                <div>
                                    <img className={styles.logo} src={item.user.picture} alt={item.user.name} />
                                    <div className={styles.info}>
                                        <strong>{item.user.name}</strong>
                                        <p>
                                            <img className={styles.level} src="icons/small-level.svg" alt="Level"/>
                                            Level {item.user.level}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.cell} style={{ lineHeight: '6rem'}}>
                                <span style={{ color: 'var(--blue)'}}>{item.user.challengesCompleted}</span> completados
                            </div>
                            <div className={styles.lastCell} style={{ lineHeight: '6rem'}}>
                            <span style={{ color: 'var(--blue)'}}>{item.user.experience}</span> xp
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </Navbar>
    )
}