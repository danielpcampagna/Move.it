import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from '../styles/pages/Ranking.module.css';
import Navbar from '../components/Navbar';
import { UserContext } from '../bases';

const timout = 8000;

type ItemProps = UserContext & {
    position: number;
}

function Ranking({ items }) {

    const [ isFetchingData, setIsFetchingData ] = useState<boolean>(false);

    useEffect(() => {
        console.log(true, items)
        setIsFetchingData(true)
        setTimeout(() => {
            console.log(false, items)
            if (!items || items.length === 0) {
                setIsFetchingData(false)
            }
        }, timout)
    }, [])

    useEffect(() => {

    })

    return (
        <Navbar>
            <div className={styles.rankingContainer}>
                <header>
                    <h1>Leaderboard</h1>
                </header>
                { items.length == 0 ? (
                    <div className={styles.center}>
                        { isFetchingData ? (
                            <div className="loader"></div>    
                        ) : (
                            <>
                                <strong>O raking parece estar vazio agora...</strong>
                                <p>Corra Forrest!!! E garanta a primeira posição :)</p>
                            </>
                        )}
                    </div>
                ) : (
                    <>
                        <div className={styles.grid}>
                            <div className={styles.header}>Posição</div>
                            <div className={styles.header} style={{ marginLeft: '1.75rem' }}>Usuário</div>
                            <div className={styles.header}>Desafios</div>
                            <div className={styles.header}>Experiência</div>
        
                            {items.map((item, i) => (
                                <React.Fragment key={i}>
                                    <div className={styles.firstCell}>{item.position}</div>
                                    <div className={`${styles.cell} ${styles.user}`}>
                                        <div>
                                            <img className={styles.logo} src={item.user.image} alt={item.user.name} />
                                            <div className={styles.info}>
                                                <strong>{item.user.name}</strong>
                                                <p>
                                                    <img className={styles.level} src="icons/small-level.svg" alt="Level"/>
                                                    Level {item.challengeContext.level}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.cell} style={{ lineHeight: '6rem'}}>
                                        <span style={{ color: 'var(--blue)'}}>{item.challengeContext.challengesCompleted}</span> completados
                                    </div>
                                    <div className={styles.lastCell} style={{ lineHeight: '6rem'}}>
                                    <span style={{ color: 'var(--blue)'}}>{item.challengeContext.currentExperience}</span> xp
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </Navbar>
    )
}

Ranking.getInitialProps = async (ctx) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timout);

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    };
    let items: ItemProps[] = await fetch('/api/users/', options)
                                        .then(res => res.json())
                                        .catch(error => console.error('timeout excedido'));
    clearTimeout(id);
    
    // const items = await axios.get<UserContext[]>('/api/users/').then(e => e.data);

    // Set positions
    items = !items ? [] : (items.sort((a, b) => a.challengeContext.level - b.challengeContext.level)
                                .map((item, position) => { return { ...item, position }}))
    return { items }
}

export default Ranking