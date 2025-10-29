"use client";
import { createUrl } from "@/lib/utils";
import { slugify } from "@/lib/utils/textConverter";
import { useRouter, useSearchParams } from "next/navigation";

type ShowTagsProps = {
  tags: string[];
};

const ShowTags: React.FC<ShowTagsProps> = ({ tags }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get("t");

  const handleTagClick = (name: string) => {
    const slugName = slugify(name.toLowerCase());
    const newParams = new URLSearchParams(searchParams.toString());

    if (slugName === selectedTag) {
      newParams.delete("t");
    } else {
      newParams.set("t", slugName);
    }

    router.push(createUrl("/products", newParams), { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {tags.map((tag: string) => (
        <button
          key={tag}
          className={`cursor-pointer px-3 md:px-4 py-1.5 md:py-2 rounded-2xl border text-xs md:text-sm font-medium transition-all ${
            selectedTag === slugify(tag.toLowerCase())
              ? "bg-primary text-white border-primary dark:bg-darkmode-primary dark:border-darkmode-primary"
              : "border-border dark:border-darkmode-border/40 text-text-dark dark:text-darkmode-text-dark hover:border-primary/50 hover:bg-primary/5 dark:hover:bg-darkmode-primary/5"
          }`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default ShowTags;
