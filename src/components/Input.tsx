import styles from '../styles/components/Input.module.css';

export default function Input() {
    return (
        <div className={styles.inputContainer}>
            <input type="text" placeholder="placeholder"/>
            <button>
                <img src="icons/arrow.svg" alt="right-arrow"/>
            </button>
        </div>
    )
}