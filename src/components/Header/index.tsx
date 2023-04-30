import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'
import Link from 'next/link'


export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />

                <nav>
                    <strong className={styles.active}>
                        <Link href='/' prefetch>
                            Home
                        </Link>
                    </strong>
                    <strong>
                        <Link href='/posts'>
                            Posts
                        </Link>
                    </strong>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}