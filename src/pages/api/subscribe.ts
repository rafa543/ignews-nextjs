import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { stripe } from "../../services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const session = await getSession({ req })

        if (!session?.user?.email) {
            return res.status(400).json({
                message: "Logged user does not have an e-mail"
            })
        }

        const stripeCustomer = await stripe.customers.create({
            email: session.user.email,
        })

        const checkoutSession = await stripe.checkout.sessions.create({
            customer: stripeCustomer.id,
            billing_address_collection: 'required',
            line_items: [
                { price: 'price_1MzOMjFzR3ErZ7Dn31hH08eY', quantity: 1 }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            success_url: process.env.STRIPE_SUCESS_URL as string,
            cancel_url: process.env.STRIPE_CANCEL_URL
        })

        return res.status(200).json({
            sessionId: stripeCustomer.id
        })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}