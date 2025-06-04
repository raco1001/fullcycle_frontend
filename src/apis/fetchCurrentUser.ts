import { httpClient } from '@/utils/http'
import { User } from '@/types/user'

export async function fetchCurrentUser(): Promise<User | null> {
  try {
    const { data } = await httpClient.get<User>('/users/me')
    return data
  } catch (error: any) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 404)
    ) {
      return null
    }
    return null
  }
}
