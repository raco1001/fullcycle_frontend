import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateNote, UpdateNoteParams } from '@/apis/updateNote';

export function useUpdateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: UpdateNoteParams) => updateNote(params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: ['note', params.id] });
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}
