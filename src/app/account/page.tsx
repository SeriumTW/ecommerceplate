"use client";

import Breadcrumbs from "@/layouts/components/Breadcrumbs";
import PageHeader from "@/layouts/partials/PageHeader";
import SeoMeta from "@/layouts/partials/SeoMeta";
import SkeletonAccount from "@/layouts/components/loadings/skeleton/SkeletonAccount";
import type { user } from "@/lib/shopify/types";
import { fetchUser } from "@/layouts/components/NavUser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Gravatar from "react-gravatar";
import { BsPerson, BsBox, BsFileText, BsCreditCard } from "react-icons/bs";

type Customer = user["customer"] | null;

const AccountPage = () => {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const userInfo = await fetchUser();
      if (!userInfo) {
        router.push("/login");
        return;
      }
      setCustomer(userInfo);
      setLoading(false);
    };

    getUser();
  }, [router]);

  if (loading) {
    return (
      <>
        <SeoMeta
          title="Il mio account"
          meta_title="Il mio account"
          description="Gestisci il tuo account e visualizza i tuoi ordini"
        />
        <PageHeader title="Il mio account" />
        <SkeletonAccount />
      </>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <>
      <SeoMeta
        title="Il mio account"
        meta_title="Il mio account"
        description="Gestisci il tuo account e visualizza i tuoi ordini"
      />
      <PageHeader title="Il mio account" />
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Profilo Utente */}
            <div className="bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border rounded-2xl p-6 md:p-8 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-border dark:border-darkmode-border flex items-center justify-center bg-light dark:bg-darkmode-light">
                    <Gravatar
                      email={customer.email ?? ""}
                      style={{ borderRadius: "50px" }}
                      size={96}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-text-dark dark:text-darkmode-text-dark mb-2">
                    {customer.firstName} {customer.lastName}
                  </h2>
                  <p className="text-text-light dark:text-darkmode-text-light mb-1">
                    {customer.email}
                  </p>
                  {customer.phone && (
                    <p className="text-text-light dark:text-darkmode-text-light">
                      {customer.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Opzioni */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* I miei ordini */}
              <Link
                href="/orders"
                className="bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border rounded-2xl p-6 hover:border-primary dark:hover:border-darkmode-primary transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-primary/10 dark:bg-darkmode-primary/10 flex items-center justify-center group-hover:bg-primary/20 dark:group-hover:bg-darkmode-primary/20 transition-colors">
                      <BsBox className="text-primary dark:text-darkmode-primary text-xl" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-dark dark:text-darkmode-text-dark mb-1">
                      I miei ordini
                    </h3>
                    <p className="text-sm text-text-light dark:text-darkmode-text-light">
                      Visualizza lo stato dei tuoi ordini e la cronologia degli
                      acquisti
                    </p>
                  </div>
                </div>
              </Link>

              {/* Indirizzi */}
              <div className="bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border rounded-2xl p-6 opacity-50 cursor-not-allowed">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <BsCreditCard className="text-gray-400 text-xl" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-dark dark:text-darkmode-text-dark mb-1">
                      Indirizzi
                    </h3>
                    <p className="text-sm text-text-light dark:text-darkmode-text-light">
                      Gestisci i tuoi indirizzi di spedizione
                    </p>
                    <span className="text-xs text-text-light dark:text-darkmode-text-light mt-2 inline-block">
                      (Presto disponibile)
                    </span>
                  </div>
                </div>
              </div>

              {/* Dati personali */}
              <div className="bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border rounded-2xl p-6 opacity-50 cursor-not-allowed">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <BsPerson className="text-gray-400 text-xl" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-dark dark:text-darkmode-text-dark mb-1">
                      Dati personali
                    </h3>
                    <p className="text-sm text-text-light dark:text-darkmode-text-light">
                      Modifica le tue informazioni personali
                    </p>
                    <span className="text-xs text-text-light dark:text-darkmode-text-light mt-2 inline-block">
                      (Presto disponibile)
                    </span>
                  </div>
                </div>
              </div>

              {/* Privacy e sicurezza */}
              <div className="bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border rounded-2xl p-6 opacity-50 cursor-not-allowed">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                      <BsFileText className="text-gray-400 text-xl" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-dark dark:text-darkmode-text-dark mb-1">
                      Privacy e sicurezza
                    </h3>
                    <p className="text-sm text-text-light dark:text-darkmode-text-light">
                      Gestisci le impostazioni di privacy e password
                    </p>
                    <span className="text-xs text-text-light dark:text-darkmode-text-light mt-2 inline-block">
                      (Presto disponibile)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AccountPage;
