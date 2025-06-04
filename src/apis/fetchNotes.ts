import { httpClient } from '@/utils/http';
import { Note } from '@/types/note';

export async function fetchNotes() {
  const { data } = await httpClient.get<Note[]>('/notes');
  return data;
}
