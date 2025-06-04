import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/apis/fetchNotes';
import { Note } from '@/types/note';

export function useNotes() {
  return useQuery<Note[]>({ queryKey: ['notes'], queryFn: fetchNotes });
}
