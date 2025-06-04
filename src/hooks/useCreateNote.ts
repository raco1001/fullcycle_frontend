import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote, CreateNoteParams } from '@/apis/createNote';

export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: CreateNoteParams) => createNote(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });
}
