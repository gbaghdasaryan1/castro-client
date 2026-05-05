import { useQuery } from '@tanstack/react-query';
import { fetchTeam } from './about-us-api';

export const aboutUsKeys = {
  all: ['about-us'] as const,
  team: () => [...aboutUsKeys.all, 'team'] as const,
};

export const useTeam = () =>
  useQuery({
    queryKey: aboutUsKeys.team(),
    queryFn: fetchTeam,
  });
