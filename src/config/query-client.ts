import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5 min — don't re-fetch while data is fresh
      gcTime: 1000 * 60 * 10,    // 10 min — keep unused cache around
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
