const SkeletonCategory = () => {
  return (
    <div className="grid grid-cols-2 gap-x-6 md:grid-cols-3 md:justify-items-center">
      {Array(3)
        .fill(0)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="aspect-square w-full max-w-[320px] rounded-full animate-pulse bg-neutral-200 shadow-lg "
            />
          );
        })}
    </div>
  );
};

export default SkeletonCategory;
