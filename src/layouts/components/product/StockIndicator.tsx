import { HiCheckCircle, HiXCircle } from "react-icons/hi";

interface StockIndicatorProps {
  availableForSale: boolean;
  className?: string;
}

const StockIndicator = ({
  availableForSale,
  className = "",
}: StockIndicatorProps) => {
  if (availableForSale) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 text-success dark:text-darkmode-success ${className}`}
      >
        <HiCheckCircle size={18} />
        <span className="text-sm md:text-base font-medium">Disponibile</span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 text-error dark:text-darkmode-error ${className}`}
    >
      <HiXCircle size={18} />
      <span className="text-sm md:text-base font-medium">Esaurito</span>
    </div>
  );
};

export default StockIndicator;
