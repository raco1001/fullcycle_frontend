import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '@/apis/fetchCurrentUser';
import { User } from '@/types/user';

export function useCurrentUser() {
  return useQuery<User | null>({ queryKey: ['currentUser'], queryFn: fetchCurrentUser });
}
