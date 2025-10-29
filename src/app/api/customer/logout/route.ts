import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const buildCookieOptions = () => ({
  name: "token",
  value: "",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 0,
});

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set(buildCookieOptions());
  return NextResponse.json({ ok: true });
}
