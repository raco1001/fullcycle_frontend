import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestLogout } from '@/apis/requestLogout';

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: requestLogout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}
