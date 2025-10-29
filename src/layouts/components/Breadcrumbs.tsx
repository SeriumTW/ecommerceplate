"use client";

import { humanize } from "@/lib/utils/textConverter";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiChevronRight, HiHome } from "react-icons/hi";

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  className?: string;
  items?: BreadcrumbItem[];
}

const Breadcrumbs = ({ className, items }: BreadcrumbsProps) => {
  const pathname = usePathname();

  // Se items custom sono forniti, usa quelli
  if (items && items.length > 0) {
    return (
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center justify-center gap-2 text-sm text-text-light dark:text-darkmode-text-light">
          {/* Home sempre visibile */}
          <li className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-primary dark:hover:text-darkmode-primary transition-colors"
            >
              <HiHome size={16} />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <HiChevronRight
              size={14}
              className="text-border dark:text-darkmode-border"
            />
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast || item.current ? (
                  <span className="text-text-dark dark:text-darkmode-text-dark font-medium truncate max-w-[200px]">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="hover:text-primary dark:hover:text-darkmode-primary transition-colors truncate max-w-[150px]"
                    >
                      {item.label}
                    </Link>
                    <HiChevronRight
                      size={14}
                      className="text-border dark:text-darkmode-border flex-shrink-0"
                    />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  // Fallback: breadcrumbs automatici dal pathname (comportamento esistente)
  const paths = pathname.split("/").filter((x) => x);
  let parts = [
    {
      label: (
        <HiHome
          className="text-text-light dark:text-darkmode-text-light"
          size={16}
        />
      ),
      href: "/",
      "aria-label": pathname === "/" ? "page" : undefined,
    },
  ];

  paths.forEach((label: string, i: number) => {
    const href = `/${paths.slice(0, i + 1).join("/")}`;
    label !== "page" &&
      parts.push({
        label: <span>{humanize(label.replace(/[-_]/g, " ")) || ""}</span>,
        href,
        "aria-label": pathname === href ? "page" : undefined,
      });
  });

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center justify-center gap-2 text-sm" role="list">
        {parts.map(({ label, ...attrs }, index) => (
          <li
            className="flex items-center gap-2 capitalize"
            role="listitem"
            key={index}
          >
            {index > 0 && (
              <HiChevronRight
                size={14}
                className="text-border dark:text-darkmode-border"
              />
            )}
            {index !== parts.length - 1 ? (
              <Link
                className="text-primary dark:text-darkmode-primary hover:underline"
                {...attrs}
              >
                {label}
              </Link>
            ) : (
              <span className="text-text-dark dark:text-darkmode-text-dark font-medium">
                {label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
