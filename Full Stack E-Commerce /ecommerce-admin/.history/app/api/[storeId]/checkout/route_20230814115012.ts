/** @format */

import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/primsadb";

const corsHeaders = {
	"Access-Control-Allow-Origin": "*", // Required for CORS support to work
	"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
	"Access-Control-Allow-Headers": "Content-Type, Authorization",
};
export async function OPTIONS() {
	return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
	req: Request,
	{ params }: { params: { storeId: string } },
) {
	const { productIds } = await req.json();
	if (!productIds || productIds.length === 0) {
		return new Response("No products selected.", { status: 400 });
	}
	const products = await prismadb.product.findMany({
		where: {
			id: {
				in: productIds,
			},
		},
	});

	const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
	products.forEach((product) => {
		line_items.push({
			quantity: 1,
			price_data: {
				currency: "SLE",
				product_data: {
					name: product.name,
				},
				unit_amount: product.price * 100,
			},
		});
	});

	const order = await prismadb.order.create({
		data: {
			storeId: params.storeId,
			isPaid: false,
			orderItems: productIds.map((productId: string) => ({
				product: {
					connect: {
						id: productId,
					},
				},
			})),
		},
	});

	const session = await stripe.checkout.sessions.create({
		line_items,
		mode: "payment",
		billing_address_collection: "required",
		phone_number_collection: {
			enabled: true,
		},
		success_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
		cancel_url: `${process.env.FRONTEND_STORE_URL}/cart?cancel=1`,

        metadata:{
            orderId: order.id
        }
	});
}
