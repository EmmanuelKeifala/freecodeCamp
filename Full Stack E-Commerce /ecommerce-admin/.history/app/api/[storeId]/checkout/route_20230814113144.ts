/** @format */

import Stripe from "stripe";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/primsadb";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
    "Access-Control-Allow-Methods": "Get", // Required for cookies, authorization headers with HTTPS

}
