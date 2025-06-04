import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { requestJoin, JoinParams } from '@/apis/requestJoin';

export function useJoin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: JoinParams) => {
      try {
        await requestJoin(params);
        return { result: 'success' as const };
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 409) {
          return { result: 'conflict' as const };
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}
