"use client";

import Logo from "@/components/Logo";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import social from "@/config/social.json";
import DynamicIcon from "@/helpers/DynamicIcon";
import { markdownify } from "@/lib/utils/textConverter";
import Link from "next/link";

export interface ISocial {
  name: string;
  icon: string;
  link: string;
}

const Footer = () => {
  const { copyright } = config.params;

  return (
    <footer className="footer-grain border-t border-border/80 bg-primary_muted dark:border-darkmode-border/40 dark:bg-darkmode-light">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))] md:gap-14 lg:gap-20">
          <div>
            <Logo />
            <p className="mt-4 max-w-md text-sm text-support-1 dark:text-support-1">
              Prodotti coccola-pet selezionati con cura per cani e gatti felici,
              consegnati con amore direttamente a casa tua.
            </p>
            <ul className="mt-6 flex gap-3 social-icons social-icons-footer">
              {social?.main.map((item: ISocial) => (
                <li key={item.name}>
                  <a
                    aria-label={item.name}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <span className="sr-only">{item.name}</span>
                    <DynamicIcon className="inline-block" icon={item.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Navigazione footer">
            <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-support-1 dark:text-support-1">
              Scopri
            </h2>
            <ul className="mt-4 space-y-3 text-sm font-medium text-text dark:text-darkmode-text">
              {menu.footer.map((item) => (
                <li key={item.name}>
                  <Link
                    className="transition hover:text-support-1 dark:hover:text-support-1"
                    href={item.url}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.35em] text-support-1 dark:text-support-1">
              Supporto
            </h2>
            <ul className="mt-4 space-y-3 text-sm font-medium text-text dark:text-darkmode-text">
              {menu.footerCopyright.map((item) => (
                <li key={item.name}>
                  <Link
                    className="transition hover:text-support-1 dark:hover:text-support-1"
                    href={item.url}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/80 pt-6 dark:border-darkmode-border/40">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-text dark:text-darkmode-text md:flex-row">
            <p className="order-2 text-center md:order-1 md:text-left">
              {`© ${new Date().getFullYear()} ${config.site.title}. Tutti i diritti riservati.`}
            </p>
            <p
              className="order-1 text-center font-light md:order-2 md:text-right"
              dangerouslySetInnerHTML={markdownify(copyright)}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
