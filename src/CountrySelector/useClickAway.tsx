import * as React from "react";

const useClickAway = (ref: React.RefObject<HTMLDivElement>, fn: Function) => {
  React.useEffect(() => {
    if (!ref.current) return;

    const clickAwayListener = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        fn();
      }
    };

    document.addEventListener("click", clickAwayListener);

    return () => {
      document.removeEventListener("click", clickAwayListener);
    };
  }, [ref, fn]);

  return ref;
};

export default useClickAway;
