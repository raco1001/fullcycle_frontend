import { useMutation, useQueryClient } from '@tanstack/react-query'
import { requestLogin, LoginParams } from '@/apis/requestLogin'

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: LoginParams) => requestLogin(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] })
    },
  })
}
