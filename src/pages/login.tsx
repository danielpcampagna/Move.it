import Input from '../components/Input';
import styles from '../styles/pages/Login.module.css';

import GithubIcon from '../../public/icons/github.svg';
import LogoWhiteIcon from '../../public/logo-full-white.svg';
import LoginWaterIcon from '../../public/login-water.svg';

export default function Login() {
    return (
        <div className={styles.loginContainer}>
            <LoginWaterIcon className={styles.watermark} />
            <div>
                <div className={styles.container}>
                    <LogoWhiteIcon />
                    <div>
                        <strong>Bem-vindo</strong>
                        <div className={styles.info}>
                            <GithubIcon />
                            <p>
                                Faça login com seu Github para começar
                            </p>
                        </div>
                        <Input />
                    </div>
                </div>
            </div>
        </div>
    )
}