import Head from 'next/head';
import styles from './styles.module.scss';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '@/services/prismic';
import Prismic from '@prismicio/client'

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

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query(
        [
            Prismic.predicates.at('document.type', 'publication')
        ], {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100
    }
    )

    console.log(JSON.stringify(response, null, 2))

    return {
        props: {}
    }

}