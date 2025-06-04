import { httpClient } from '@/utils/http';

export async function deleteNote(id: string) {
  await httpClient.delete(`/notes/${id}`);
}
