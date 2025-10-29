import { getCart } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cartId = cookieStore.get("cartId")?.value;

    if (!cartId) {
      return NextResponse.json({ cart: null });
    }

    const cart = await getCart(cartId);

    return NextResponse.json({ cart: cart ?? null });
  } catch (cause) {
    console.error("Unable to fetch cart", cause);
    const status =
      typeof (cause as { status?: number })?.status === "number"
        ? (cause as { status: number }).status
        : 500;
    return NextResponse.json({ error: "Unable to fetch cart" }, { status });
  }
}
