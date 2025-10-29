import { HiShieldCheck, HiTruck } from "react-icons/hi";
import { HiArrowPath } from "react-icons/hi2";

interface TrustBadge {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
}

interface TrustBadgesProps {
  className?: string;
  badges?: TrustBadge[];
}

const defaultBadges: TrustBadge[] = [
  {
    icon: (
      <HiTruck size={24} className="text-primary dark:text-darkmode-primary" />
    ),
    title: "Spedizione Veloce",
    subtitle: "Consegna in 2-3 giorni",
  },
  {
    icon: (
      <HiShieldCheck
        size={24}
        className="text-success dark:text-darkmode-success"
      />
    ),
    title: "Pagamenti Sicuri",
    subtitle: "SSL e crittografia",
  },
  {
    icon: (
      <HiArrowPath size={24} className="text-info dark:text-darkmode-info" />
    ),
    title: "Resi Facili",
    subtitle: "14 giorni per ripensarci",
  },
];

const TrustBadges = ({
  className = "",
  badges = defaultBadges,
}: TrustBadgesProps) => {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 ${className}`}
    >
      {badges.map((badge, index) => (
        <div
          key={index}
          className="flex items-start gap-3 bg-light/50 dark:bg-darkmode-light/30 p-3 md:p-4 rounded-2xl border border-border/20 dark:border-darkmode-border/20"
        >
          <div className="flex-shrink-0 mt-0.5">{badge.icon}</div>
          <div className="flex-1 min-w-0">
            <h6 className="text-xs md:text-sm font-bold text-text-dark dark:text-darkmode-text-dark leading-tight mb-1">
              {badge.title}
            </h6>
            {badge.subtitle && (
              <p className="text-[10px] md:text-xs text-text-light dark:text-darkmode-text-light leading-relaxed break-words">
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
