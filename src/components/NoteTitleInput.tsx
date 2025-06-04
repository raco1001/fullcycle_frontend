import React from 'react';

export interface NoteTitleInputProps {
  value: string;
  onChange(value: string): void;
}

export const NoteTitleInput: React.FC<NoteTitleInputProps> = ({ value, onChange }) => (
  <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="제목" />
);
