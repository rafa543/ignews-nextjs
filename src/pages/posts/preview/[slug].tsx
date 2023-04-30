import { getPrismicClient } from "@/services/prismic";
import { GetServerSideProps, GetStaticProps } from "next"
import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import styles from '../post.module.scss'
import Link from "next/link";
import {useEffect} from 'react'
import { useRouter } from "next/router";

interface PostPreviewProps {
    post: {
        slug: string;
        title: string;
        content: string;
        updatedAt: string;
    }
}

export default function PostPreview({ post }: PostPreviewProps) {
    const { data: session } = useSession() as any;
    const router = useRouter()

    console.log(session)
    useEffect(() => {
        if(session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

    return (
        <>
            <Head>
                <title>{post.title} | Git.News</title>
            </Head>
            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={`${styles.postContent} ${styles.previewContent}`}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    <div className={styles.continueReading}>
                        Wanna continue reading?
                        <Link href="/">
                            Subscribe now 🤗
                        </Link>
                    </div>
                </article>
            </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as any
    
    const prismic = getPrismicClient()
    const response = await prismic.getByUID<any>('publication', String(slug), {})

    const post = {
        slug,
        title: response.data.title,
        content: RichText.asHtml(response.data.content.splice(0, 3)),
        updatedAt: new Date(response.last_publication_date as string).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        })
    }

    return {
        props: {
            post
        }
    }
}