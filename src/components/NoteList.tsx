import React from 'react';
import { Note } from '@/types/note';

export interface NoteListProps {
  notes: Note[];
  onSelect?(note: Note): void;
}

export const NoteList: React.FC<NoteListProps> = ({ notes, onSelect }) => (
  <ul>
    {notes.map((note) => (
      <li key={note.id}>
        <button onClick={() => onSelect?.(note)}>{note.title}</button>
      </li>
    ))}
  </ul>
);
