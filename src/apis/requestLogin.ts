import { httpClient } from '@/utils/http'

export interface LoginParams {
  email: string
  password: string
}

export async function requestLogin(params: LoginParams) {
  await httpClient.post('/auth/login', params)
}
