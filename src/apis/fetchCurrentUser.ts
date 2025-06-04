import { httpClient } from '@/utils/http';
import { User } from '@/types/user';

export async function fetchCurrentUser() {
  const { data } = await httpClient.get<User>('/me');
  return data;
}
