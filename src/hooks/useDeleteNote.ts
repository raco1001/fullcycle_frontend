import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteNote } from '@/apis/deleteNote';

export function useDeleteNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}
