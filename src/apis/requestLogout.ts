import { httpClient } from '@/utils/http'

export async function requestLogout() {
  await httpClient.post('/auth/logout')
}
