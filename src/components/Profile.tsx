import styles from '../styles/components/Profile.module.css';

export function Profile() {
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/danielpcampagna.png" alt="Daniel Prett Campagna" />
            <div>
                <strong>Daniel Prett Campagna</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    level 1
                </p>
            </div>
        </div>
    )
}