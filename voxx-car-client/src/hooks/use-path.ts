import { useLocation } from "@tanstack/react-router";

export default function usePath() {
  const pathname = useLocation({
    select: (location) => location.pathname,
  });

  return pathname;
}
