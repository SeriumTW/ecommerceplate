"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const Tabs = ({ descriptionHtml }: { descriptionHtml: string }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);
  const contentArray = description.split(`--- split content ---`);
  const t = useTranslations("product");

  useEffect(() => {
    setDescription(descriptionHtml);
    setLoading(false);
  }, [descriptionHtml]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className="border-b relative border-border  flex">
        <button
          onClick={() => setSelectedTab(0)}
          className={`${
            selectedTab === 0
              ? "border-t border-l border-r border-b-0 bg-body  border-border  translate-y-[1px]"
              : "border-transparent"
          } cursor-pointer focus:outline-none px-6 rounded-tl-2xl rounded-tr-2xl h-12 py-2 text-sm md:text-base border-t border-l border-r border-b-0 font-medium transition-colors`}
        >
          {t("description")}
        </button>
        {contentArray[1] && (
          <button
            onClick={() => setSelectedTab(1)}
            className={`${
              selectedTab === 1
                ? "border-t border-l border-r border-b-0 border-border  bg-body  translate-y-[1px]"
                : "border-transparent"
            } cursor-pointer focus:outline-none px-6 rounded-tl-2xl rounded-tr-2xl h-12 py-2 text-sm md:text-base border-t border-l border-r border-b-0 ml-8 font-medium transition-colors`}
          >
            {t("moreInfo")}
          </button>
        )}
      </div>
      <div className="border-l border-r border-b border-border  rounded-bl-2xl rounded-br-2xl p-6 md:p-8">
        {selectedTab === 0 && (
          <div
            className="space-y-4"
            dangerouslySetInnerHTML={{ __html: contentArray[0] }}
          />
        )}
        {selectedTab === 1 && contentArray[1] && (
          <div
            className="space-y-4"
            dangerouslySetInnerHTML={{ __html: contentArray[1] }}
          />
        )}
      </div>
    </>
  );
};

export default Tabs;
