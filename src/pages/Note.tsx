import { useParams, useNavigate } from 'react-router-dom'
import { useNote } from '@/hooks/useNote'
import { NoteTitleInput } from '@/components/NoteTitleInput'
import { NoteContentEditor } from '@/components/NoteContentEditor'
import { useUpdateNote } from '@/hooks/useUpdateNote'
import { useCreateNote } from '@/hooks/useCreateNote'
import { useDeleteNote } from '@/hooks/useDeleteNote'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
`

const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-shrink: 0;
`

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  background-color: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    background-color: #f1f3f5;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`

const StyledNoteTitleInput = styled(NoteTitleInput)`
  border: none;
  font-size: 2.5rem;
  font-weight: bold;
  padding: 0;
  outline: none;
  width: 100%;
  background-color: transparent;
  color: #212529;

  &::placeholder {
    color: #adb5bd;
  }
`

const StyledNoteContentEditor = styled(NoteContentEditor)`
  flex-grow: 1;
  border: none;
  font-size: 1.1rem;
  line-height: 1.7;
  padding: 0;
  outline: none;
  resize: none;
  background-color: transparent;
  color: #495057;

  &::placeholder {
    color: #adb5bd;
  }
`

export default function NotePage() {
  const { noteId = '' } = useParams()
  const navigate = useNavigate()
  const isCreateMode = noteId === 'new'

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const {
    data: note,
    isLoading: isNoteLoading,
    isError: isNoteError,
  } = useNote(noteId!)

  const updateMutation = useUpdateNote()
  const createMutation = useCreateNote()
  const deleteMutation = useDeleteNote()
  useEffect(() => {
    if (isCreateMode) {
      setTitle('')
      setContent('')
    } else if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [noteId, note, isCreateMode])

  const handleSave = async () => {
    if (isCreateMode) {
      try {
        const createdNote = await createMutation.mutateAsync({ title, content })
        if (createdNote) {
          navigate(`/notes/${createdNote.id}`, { replace: true })
        }
      } catch (error) {
        console.error('Failed to create note:', error)
      }
    } else if (note) {
      updateMutation.mutate({ id: note.id, title, content })
    }
  }

  if (!isCreateMode && isNoteLoading) {
    return <div>Loading note details...</div>
  }

  if (!isCreateMode && isNoteError) {
    return (
      <div>
        Error loading note. It might not exist or there was a network issue.
      </div>
    )
  }

  if (!isCreateMode && !note && !isNoteLoading) {
    return <div>Note not found.</div>
  }

  const handleDelete = async () => {
    if (note) {
      await deleteMutation.mutateAsync(note.id)
      navigate('/notes')
    }
  }

  const currentTitle = isCreateMode ? title : (note?.title ?? '')
  const currentContent = isCreateMode ? content : (note?.content ?? '')

  return (
    <Container>
      <Header>
        <div style={{ flexGrow: 1, marginRight: '24px' }}>
          <StyledNoteTitleInput
            value={currentTitle}
            onChange={setTitle}
            placeholder="제목 없음"
          />
        </div>
        <Actions>
          <ActionButton
            onClick={handleSave}
            disabled={createMutation.isPending || updateMutation.isPending}
          >
            <span>💾</span>
            <span>
              {createMutation.isPending || updateMutation.isPending
                ? '저장 중...'
                : '저장'}
            </span>
          </ActionButton>
          {!isCreateMode && (
            <ActionButton
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              <span>🗑️</span>
              <span>{deleteMutation.isPending ? '삭제 중...' : '삭제'}</span>
            </ActionButton>
          )}
        </Actions>
      </Header>
      <StyledNoteContentEditor value={currentContent} onChange={setContent} />
    </Container>
  )
}
