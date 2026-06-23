import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { getUserSession } from "@/lib/core/session";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { product, customerInfo } = await req.json();
  const headersList = await headers();
  const origin = headersList.get("origin");
  const sessionUser = await getUserSession();
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
      productId: product._id,
      productName: product.title,
      productPrice: product.price,
      productImage: product.images[0],

      buyerId: sessionUser?.id as string,
      buyerName: sessionUser?.name as string,
      buyerEmail: sessionUser?.email as string,

      sellerId: product.sellerInfo.userId,
      sellerName: product.sellerInfo.name,
      sellerEmail: product.sellerInfo.email,
    },

    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout`,
  });

  return NextResponse.json({
    url: session.url,
  });
}
