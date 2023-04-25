import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href='#'>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Monorepo with Lena & Workspaces</strong>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur blanditiis eos unde voluptatum? Odio quos cumque perferendis eveniet architecto quis fuga quibusdam similique dolores non iure nisi, voluptate esse. Deleniti!</p>
                    </a>
                    <a href='#'>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Monorepo with Lena & Workspaces</strong>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur blanditiis eos unde voluptatum? Odio quos cumque perferendis eveniet architecto quis fuga quibusdam similique dolores non iure nisi, voluptate esse. Deleniti!</p>
                    </a>
                    <a href='#'>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Monorepo with Lena & Workspaces</strong>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur blanditiis eos unde voluptatum? Odio quos cumque perferendis eveniet architecto quis fuga quibusdam similique dolores non iure nisi, voluptate esse. Deleniti!</p>
                    </a>
                    <a href='#'>
                        <time>12 de março de 2021</time>
                        <strong>Creating a Monorepo with Lena & Workspaces</strong>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur blanditiis eos unde voluptatum? Odio quos cumque perferendis eveniet architecto quis fuga quibusdam similique dolores non iure nisi, voluptate esse. Deleniti!</p>
                    </a>
                </div>
            </main>
        </>
    )
}