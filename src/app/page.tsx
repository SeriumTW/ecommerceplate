import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getPublicLocaleSegment } from "@/lib/i18n/config";
import {
  getManualOverrideLocale,
  resolveAutomaticLocale,
} from "@/lib/i18n/market";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  const headerStore = await headers();
  const cookieStore = await cookies();
  const locale =
    getManualOverrideLocale(cookieStore) ?? resolveAutomaticLocale(headerStore);

  redirect(`/${getPublicLocaleSegment(locale)}`);
}
