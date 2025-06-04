import { useQuery } from '@tanstack/react-query';
import { fetchNote } from '@/apis/fetchNote';
import { Note } from '@/types/note';

export function useNote(id: string) {
  return useQuery<Note>({ queryKey: ['note', id], queryFn: () => fetchNote(id), enabled: !!id });
}
