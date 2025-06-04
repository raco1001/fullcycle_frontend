import React from 'react';
import { useParams } from 'react-router-dom';
import { useNote } from '@/hooks/useNote';
import { Note } from '@/types/note';

export interface WithCurrentNoteProps {
  note: Note;
}

export function withCurrentNote<P>(Component: React.ComponentType<P & WithCurrentNoteProps>) {
  return function Wrapper(props: P) {
    const { noteId = '' } = useParams();
    const { data: note } = useNote(noteId);
    if (!note) return <div>Loading...</div>;
    return <Component {...props} note={note} />;
  };
}
