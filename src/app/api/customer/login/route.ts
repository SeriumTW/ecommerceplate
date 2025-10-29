import { getCustomerAccessToken, getUserDetails } from "@/lib/shopify";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};

export async function POST(req: NextRequest) {
  try {
    const input = await req.json();
    const { token, customerLoginErrors } = await getCustomerAccessToken(input);
    if (!token) {
      return NextResponse.json(
        {
          errors:
            customerLoginErrors?.length > 0
              ? customerLoginErrors
              : [
                  {
                    code: "UNIDENTIFIED_CUSTOMER",
                    message: "Credenziali non valide",
                  },
                ],
        },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    cookieStore.set({ name: "token", value: token, ...authCookieOptions });

    const { customer } = await getUserDetails(token);

    return NextResponse.json({ customer });
  } catch (cause) {
    console.error("Customer login failed", cause);
    const message =
      cause instanceof Error
        ? cause.message
        : "Si e' verificato un errore imprevisto";
    const status =
      typeof (cause as { status?: number })?.status === "number"
        ? (cause as { status: number }).status
        : 500;

    return NextResponse.json(
      { errors: [{ code: "INTERNAL_ERROR", message }] },
      { status },
    );
  }
}
