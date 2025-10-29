import { useEffect, useRef } from "react";

const useLoadMore = (
  elementRef: React.RefObject<HTMLElement | null>,
  callback: () => void,
  options?: IntersectionObserverInit,
) => {
  const callbackRef = useRef(callback);
  const rootMargin = options?.rootMargin ?? "200px";
  const threshold = options?.threshold ?? 0;
  const root = options?.root ?? null;

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callbackRef.current();
          }
        });
      },
      { root, rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [elementRef, root, rootMargin, threshold]);
};

export default useLoadMore;
