const SkeletonDescription = () => {
  return (
    <div>
      <div className="border-b-2 border-border dark:border-border/40 flex gap-x-6">
        <div
          className={`w-[13%] border-t-2 border-l-2 border-r-2 border-b-0 border-border dark:border-border/40 animate-pulse bg-neutral-200 dark:bg-neutral-700 px-6 rounded-tl-2xl rounded-tr-2xl h-12`}
        />
        <div
          className={`w-[13%] border-t-2 border-l-2 border-r-2 border-border dark:border-border/40 border-b-0 animate-pulse bg-neutral-200 dark:bg-neutral-700 px-6 rounded-tl-2xl rounded-tr-2xl h-12`}
        />
      </div>
      <div className="border-l-2 border-r-2 border-b-2 border border-border dark:border-border/40 rounded-bl-2xl rounded-br-2xl p-6">
        <div className="h-10 mb-4 rounded-2xl animate-pulse bg-neutral-200 dark:bg-neutral-700" />
        <div>
          <div className="h-10 mb-4 rounded-2xl animate-pulse bg-neutral-200 dark:bg-neutral-700" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonDescription;
