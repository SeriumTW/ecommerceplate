import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-body px-4 ">
      <div className="max-w-xl text-center">
        <span className="block text-[8rem] font-bold leading-none text-primary ">
          404
        </span>
        <h1 className="mt-4 text-3xl font-semibold text-text-dark ">
          Pagina non trovata
        </h1>
        <p className="mt-3 text-text-light ">
          L&apos;URL richiesto non esiste o non e` piu` disponibile.
        </p>
        <Link
          href="/mx"
          className="btn btn-primary mt-8 inline-flex items-center justify-center"
        >
          Torna alla home
        </Link>
      </div>
    </main>
  );
}
