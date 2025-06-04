import React from 'react';

export interface NoteContentEditorProps {
  value: string;
  onChange(value: string): void;
}

export const NoteContentEditor: React.FC<NoteContentEditorProps> = ({ value, onChange }) => (
  <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder="내용" rows={10} />
);
