import { useRef, useCallback } from "react";

const useScrollToIndex = <T extends HTMLElement>() => {
  const listRef = useRef<T>(null);

  const scrollToIndex = useCallback((index: number) => {
    const list = listRef.current;
    if (list) {
      const item = list.children[index] as HTMLElement;
      if (item) {
        item.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, []);

  return { listRef, scrollToIndex };
};

export default useScrollToIndex;
