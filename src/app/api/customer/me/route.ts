import { getUserDetails } from "@/lib/shopify";
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
    return NextResponse.json({ customer: null }, { status: 200 });
  }

  try {
    const { customer } = await getUserDetails(token);
    return NextResponse.json({ customer });
  } catch (cause) {
    console.error("Customer session lookup failed", cause);
    await clearAuthCookie();
    return NextResponse.json({ customer: null }, { status: 401 });
  }
}
