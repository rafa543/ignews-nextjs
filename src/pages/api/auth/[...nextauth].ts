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
        async session({ session }) {
            // console.log(session)
            try {
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection([
                            q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select(
                                    "ref",
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'),
                                            q.Casefold(session.user?.email as string)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index("subscription_by_status"),
                                "active"
                            )
                        ])
                    )
                )

                return {
                    ...session,
                    activeSubscription: userActiveSubscription
                }
            } catch (error) {
                return {
                    ...session,
                    activeSubscription: null,
                };
            }


        },
        async signIn({ user, account, profile }) {
            const { email } = user

            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(String(user.email))
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(String(user.email))
                            )
                        )
                    )
                )
                return true
            } catch (error) {
                return false
            }

        },
    }
});