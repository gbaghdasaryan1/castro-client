import { axiosInstance } from '@config/axios';
import type { TeamMember } from './types';

export const fetchTeam = async (): Promise<TeamMember[]> => {
  const { data } = await axiosInstance.get<TeamMember[]>('/about-us/team');
  return data;
};
