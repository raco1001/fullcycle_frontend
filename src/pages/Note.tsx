import { useParams } from 'react-router-dom';
import { useNote } from '@/hooks/useNote';
import { NoteTitleInput } from '@/components/NoteTitleInput';
import { NoteContentEditor } from '@/components/NoteContentEditor';
import { useUpdateNote } from '@/hooks/useUpdateNote';

export default function NotePage() {
  const { noteId = '' } = useParams();
  const { data: note } = useNote(noteId);
  const update = useUpdateNote();

  if (!note) {
    return <div>Loading...</div>;
  }

  const handleSave = () => {
    update.mutate({ id: note.id, title: note.title, content: note.content });
  };

  return (
    <div>
      <NoteTitleInput value={note.title} onChange={(v) => (note.title = v)} />
      <NoteContentEditor value={note.content} onChange={(v) => (note.content = v)} />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
