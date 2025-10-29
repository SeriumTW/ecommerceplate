"use client";

import { HiMinus, HiPlus } from "react-icons/hi";

interface QuantitySelectorProps {
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
  max?: number;
  min?: number;
  disabled?: boolean;
}

const QuantitySelector = ({
  quantity,
  onQuantityChange,
  max = 99,
  min = 1,
  disabled = false,
}: QuantitySelectorProps) => {
  const handleDecrease = () => {
    if (quantity > min && !disabled) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max && !disabled) {
      onQuantityChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= min && value <= max) {
      onQuantityChange(value);
    }
  };

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm md:text-base font-semibold text-text-dark dark:text-darkmode-text-dark">
        Quantità:
      </label>
      <div className="flex items-center border border-border dark:border-darkmode-border rounded-2xl overflow-hidden bg-light/30 dark:bg-darkmode-light/10">
        <button
          onClick={handleDecrease}
          disabled={quantity <= min || disabled}
          className="p-3 md:p-4 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-primary/10 dark:hover:bg-darkmode-primary/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent focus:outline-none active:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:focus-visible:ring-darkmode-primary/50"
          aria-label="Diminuisci quantità"
        >
          <HiMinus
            size={20}
            className="text-text-dark dark:text-darkmode-text-dark"
          />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          disabled={disabled}
          className="w-16 md:w-20 text-center bg-transparent border-0 text-base md:text-lg font-bold text-text-dark dark:text-darkmode-text-dark focus:outline-none focus:ring-0 disabled:opacity-50 min-h-[44px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          onClick={handleIncrease}
          disabled={quantity >= max || disabled}
          className="p-3 md:p-4 min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-primary/10 dark:hover:bg-darkmode-primary/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent focus:outline-none active:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 dark:focus-visible:ring-darkmode-primary/50"
          aria-label="Aumenta quantità"
        >
          <HiPlus
            size={20}
            className="text-text-dark dark:text-darkmode-text-dark"
          />
        </button>
      </div>
      {max < 99 && (
        <span className="text-xs text-text-light dark:text-darkmode-text-light">
          Max: {max}
        </span>
      )}
    </div>
  );
};

export default QuantitySelector;
