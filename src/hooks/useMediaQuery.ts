import { useState, useEffect } from "react";

/**
 * Hook that returns whether a CSS media query matches.
 * Returns false during SSR and on first render to avoid hydration mismatches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    function handleChange(e: MediaQueryListEvent): void {
      setMatches(e.matches);
    }

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}

/** Matches the tablet breakpoint (768px) and above */
export function useIsTablet(): boolean {
  return useMediaQuery("(min-width: 768px)");
}
