import React from 'react'

export interface NoteTitleInputProps {
  value: string
  onChange(value: string): void
  placeholder?: string
  className?: string
  onBlur?: () => void
}

export const NoteTitleInput: React.FC<NoteTitleInputProps> = ({
  value,
  onChange,
  placeholder = '제목 없음',
  className,
  onBlur,
}) => (
  <input
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
    className={className}
    onBlur={onBlur}
    autoFocus
  />
)
