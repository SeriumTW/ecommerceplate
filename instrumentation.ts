// Next.js instrumentation hook.
// In Node 25+, `globalThis.localStorage`/`sessionStorage` can exist as a stub object
// without the standard Storage methods. Some Next dev-only code feature-detects via
// `typeof localStorage !== "undefined"` and then calls `.getItem`, crashing the
// dev server. We force these globals to `undefined` on the server so feature
// detection behaves as expected.

function disableStubWebStorage(name: "localStorage" | "sessionStorage") {
  const storage = (globalThis as unknown as Record<string, unknown>)[name];
  if (typeof storage === "undefined") return;

  const hasStandardApi =
    typeof (storage as { getItem?: unknown }).getItem === "function" &&
    typeof (storage as { setItem?: unknown }).setItem === "function";

  if (hasStandardApi) return;

  // Make it truly "missing" so `typeof localStorage !== "undefined"` checks fail.
  Object.defineProperty(globalThis, name, {
    value: undefined,
    configurable: true,
    writable: true,
  });
}

export async function register() {
  // Server-only: in the browser we want the real Web Storage.
  if (typeof window !== "undefined") return;

  disableStubWebStorage("localStorage");
  disableStubWebStorage("sessionStorage");
}
