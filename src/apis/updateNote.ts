import { httpClient } from '@/utils/http';
import { Note } from '@/types/note';

export interface UpdateNoteParams {
  id: string;
  title: string;
  content: string;
}

export async function updateNote(params: UpdateNoteParams) {
  const { data } = await httpClient.put<Note>(`/notes/${params.id}`, {
    title: params.title,
    content: params.content,
  });
  return data;
}
