import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import Price from "@/components/Price";
import { DeleteItemButton } from "@/components/cart/DeleteItemButton";
import { EditItemQuantityButton } from "@/components/cart/EditItemQuantityButton";
import { DEFAULT_OPTION } from "@/lib/constants";
import { getCart } from "@/lib/shopify";
import type { Cart, CartItem } from "@/lib/shopify/types";
import { createUrl } from "@/lib/utils";

type MerchandiseSearchParams = {
  [key: string]: string;
};

const buildMerchandiseUrl = (item: CartItem) => {
  const merchandiseSearchParams = {} as MerchandiseSearchParams;

  item.merchandise.selectedOptions.forEach(({ name, value }) => {
    if (value !== DEFAULT_OPTION) {
      merchandiseSearchParams[name.toLowerCase()] = value;
    }
  });

  return createUrl(
    `/products/${item.merchandise.product.handle}`,
    new URLSearchParams(merchandiseSearchParams),
  );
};

const EmptyCartState = () => (
  <section className="container py-24">
    <div className="mx-auto max-w-xl rounded-2xl border border-border/60 bg-light/70 p-10 text-center shadow-sm dark:border-darkmode-border/60 dark:bg-darkmode-light/10">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80 dark:text-darkmode-primary">
        Il tuo carrello
      </p>
      <h1 className="mt-4 text-3xl font-semibold text-text-dark dark:text-white">
        Ancora vuoto
      </h1>
      <p className="mt-3 text-text-light dark:text-darkmode-text">
        Aggiungi i prodotti preferiti per animali domestici e torna qui per
        completare l&apos;ordine.
      </p>
      <Link
        href="/products"
        className="btn btn-primary mt-8 inline-flex rounded-full px-6 py-3 text-sm"
      >
        Vai al catalogo
      </Link>
    </div>
  </section>
);

const CartLine = ({ item }: { item: CartItem }) => {
  const merchandiseUrl = buildMerchandiseUrl(item);
  const options = item.merchandise.selectedOptions.filter(
    ({ value }) => value !== DEFAULT_OPTION,
  );

  return (
    <li className="rounded-2xl border border-border/60 bg-body p-4 shadow-sm dark:border-darkmode-border/60 dark:bg-darkmode-body">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
        <Link
          href={merchandiseUrl}
          className="relative h-24 w-24 flex-none overflow-hidden rounded-2xl border border-border/50 bg-light/80 dark:border-darkmode-border/50 dark:bg-darkmode-light/20"
        >
          <Image
            src={
              item.merchandise.product.featuredImage?.url ||
              "/images/product_image404.jpg"
            }
            alt={item.merchandise.title}
            fill
            className="object-cover"
          />
        </Link>

        <div className="flex-1 space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <Link
                href={merchandiseUrl}
                className="text-lg font-semibold text-text-dark transition hover:text-primary dark:text-white dark:hover:text-darkmode-primary"
              >
                {item.merchandise.product.title}
              </Link>
              {options.length ? (
                <ul className="text-sm text-text-light dark:text-darkmode-text">
                  {options.map(({ name, value }) => (
                    <li key={name}>
                      {name}: {value}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <Price
              className="text-base font-semibold text-text-dark dark:text-white"
              amount={item.cost.totalAmount.amount}
              currencyCode={item.cost.totalAmount.currencyCode}
            />
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 rounded-full border border-border/50 bg-light/60 px-2 py-1 dark:border-darkmode-border/50 dark:bg-darkmode-light/10">
              <EditItemQuantityButton item={item} type="minus" />
              <span className="min-w-[28px] text-center text-sm font-semibold text-text-dark dark:text-white">
                {item.quantity}
              </span>
              <EditItemQuantityButton item={item} type="plus" />
            </div>
            <DeleteItemButton item={item} />
          </div>
        </div>
      </div>
    </li>
  );
};

const CartSummary = ({ cart }: { cart: Cart }) => (
  <aside className="rounded-2xl border border-border/60 bg-body p-6 shadow-sm dark:border-darkmode-border/60 dark:bg-darkmode-body">
    <h2 className="text-lg font-semibold text-text-dark dark:text-white">
      Riepilogo ordine
    </h2>
    <div className="mt-4 space-y-3 text-sm text-text-light dark:text-darkmode-text">
      <div className="flex items-center justify-between">
        <span>Subtotale</span>
        <Price
          className="text-base font-semibold text-text-dark dark:text-white"
          amount={cart.cost.subtotalAmount.amount}
          currencyCode={cart.cost.subtotalAmount.currencyCode}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Imposte</span>
        <Price
          className="text-base font-semibold text-text-dark dark:text-white"
          amount={cart.cost.totalTaxAmount.amount}
          currencyCode={cart.cost.totalTaxAmount.currencyCode}
        />
      </div>
      <div className="flex items-center justify-between">
        <span>Spedizione</span>
        <span>Calcolata al checkout</span>
      </div>
      <div className="flex items-center justify-between border-t border-border/40 pt-3 text-base font-semibold text-text-dark dark:border-darkmode-border/60 dark:text-white">
        <span>Totale</span>
        <Price
          className="text-xl font-semibold"
          amount={cart.cost.totalAmount.amount}
          currencyCode={cart.cost.totalAmount.currencyCode}
        />
      </div>
    </div>
    <a
      href={cart.checkoutUrl}
      className="btn btn-primary mt-6 flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold"
    >
      Procedi al checkout
    </a>
    <p className="mt-3 text-xs text-text-light dark:text-darkmode-text">
      Pagamenti sicuri con Shopify. Potrai aggiungere note o codici sconto nella
      pagina successiva.
    </p>
  </aside>
);

export default async function CartPage() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const cart = cartId ? await getCart(cartId) : undefined;

  if (!cart || !cart.lines.length) {
    return <EmptyCartState />;
  }

  return (
    <section className="container py-16">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/80 dark:text-darkmode-primary">
          Il tuo carrello
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-text-dark dark:text-white">
          Pronto per il tuo pet
        </h1>
        <p className="mt-2 text-text-light dark:text-darkmode-text">
          Controlla gli articoli selezionati, aggiorna le quantità o rimuovi ciò
          che non ti serve prima di procedere al pagamento.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <ul className="space-y-4">
          {cart.lines.map((item) => (
            <CartLine key={item.id} item={item} />
          ))}
        </ul>
        <CartSummary cart={cart} />
      </div>

      <div className="mt-12 rounded-2xl border border-border/40 bg-light/60 p-6 text-sm text-text-light shadow-sm dark:border-darkmode-border/40 dark:bg-darkmode-light/10 dark:text-darkmode-text">
        <p>
          Hai bisogno di assistenza?{" "}
          <Link
            href="/contact"
            className="font-semibold text-primary dark:text-darkmode-primary"
          >
            Contattaci
          </Link>{" "}
          e il nostro team ti guiderà nella scelta dei prodotti migliori per il
          tuo animale domestico.
        </p>
      </div>
    </section>
  );
}
