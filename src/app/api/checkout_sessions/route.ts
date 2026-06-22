import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { product, customerInfo } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    customer_email: customerInfo.email,

    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",

          product_data: {
            name: product.title,
            description: product.description,
            images: [product.images[0]],
          },

          unit_amount: product.price * 100,
        },
      },
    ],

    metadata: {
      productId: product.id,
      productTitle: product.title,
      buyerName: customerInfo.fullName,
      phone: customerInfo.phone,
      address: customerInfo.address,
    },

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
  });

  return NextResponse.json({
    url: session.url,
  });
}
