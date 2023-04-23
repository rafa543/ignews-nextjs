import { query as q } from 'faunadb';
import NextAuth from 'next-auth';
import GithubProviders from 'next-auth/providers/github';

import { fauna } from '@/services/fauna';

export default NextAuth({

    providers: [
        GithubProviders({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: 'read:user',
                },
            },
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            const { email } = user

            try {
                await fauna.query(
                    q.Create(
                        q.Collection('users'),
                        { data: { email } }
                    )
                )
                return true
            } catch (error) {
                return false
            }

        },
    }
});