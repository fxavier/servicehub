import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
	try {
		const { bookingId, amount } = await req.json();

		const paymentIntent = await stripe.paymentIntents.create({
			amount: Math.round(amount * 100), // Convert to cents
			currency: 'usd',
			metadata: {
				booking_id: bookingId,
			},
		});

		return NextResponse.json({ clientSecret: paymentIntent.client_secret });
	} catch (error) {
		console.error('Payment error:', error);
		return NextResponse.json({ error: 'Payment failed' }, { status: 500 });
	}
}
