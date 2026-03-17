import { BsCart3 } from "react-icons/bs";

export default function OpenCart({
  className,
  quantity,
}: {
  className?: string;
  quantity?: number;
}) {
  return (
    <div className="relative text-xl text-text-dark hover:text-primary">
      <BsCart3 className={className} />

      {quantity ? (
        <div className="absolute -top-1 -right-3 flex h-5 w-5 items-center justify-center rounded-full bg-black p-1 text-xs text-white md:-top-2 md:-right-4">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
