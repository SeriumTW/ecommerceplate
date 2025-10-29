import { getCustomerOrders } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const clearAuthCookie = async () => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
};

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return NextResponse.json({ orders: [] }, { status: 200 });
  }

  try {
    const orders = await getCustomerOrders(token);
    return NextResponse.json({ orders });
  } catch (cause) {
    console.error("Customer orders lookup failed", cause);

    const errorMessage =
      cause instanceof Error ? cause.message : "Errore sconosciuto";
    const status =
      errorMessage.includes("Unauthorized") ||
      errorMessage.includes("authentication") ||
      errorMessage.includes("token")
        ? 401
        : 500;

    // Se è un errore di autenticazione, cancella il cookie
    if (status === 401) {
      await clearAuthCookie();
    }

    return NextResponse.json(
      {
        orders: [],
        error: errorMessage,
      },
      { status },
    );
  }
}
