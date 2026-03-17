"use client";

import { HiShieldCheck, HiTruck } from "react-icons/hi";
import { HiArrowPath } from "react-icons/hi2";
import { useTranslations } from "next-intl";

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

interface TrustBadgesProps {
  className?: string;
  badges?: TrustBadge[];
}

const TrustBadges = ({ className = "", badges }: TrustBadgesProps) => {
  const t = useTranslations("product");

  const defaultBadges: TrustBadge[] = [
    {
      icon: <HiTruck size={24} className="text-primary " />,
      title: t("freeShipping"),
      subtitle: t("freeShippingDesc"),
    },
    {
      icon: <HiShieldCheck size={24} className="text-success " />,
      title: t("securePayments"),
      subtitle: t("securePaymentsDesc"),
    },
    {
      icon: <HiArrowPath size={24} className="text-info " />,
      title: t("easyReturns"),
      subtitle: t("easyReturnsDesc"),
    },
  ];

  const displayBadges = badges ?? defaultBadges;

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 ${className}`}
    >
      {displayBadges.map((badge, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-light/50  p-3 md:p-4 rounded-2xl border border-border/20 "
        >
          <div className="flex-shrink-0 mt-0.5">{badge.icon}</div>
          <div className="flex-1 min-w-0">
            <h6 className="text-xs md:text-sm font-bold text-text-dark  leading-tight mb-1">
              {badge.title}
            </h6>
            {badge.subtitle && (
              <p className="text-[10px] md:text-xs text-text-light  leading-relaxed break-words">
                {badge.subtitle}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrustBadges;
