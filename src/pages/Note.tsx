import { useParams, useNavigate } from 'react-router-dom'
import { useNote } from '@/hooks/useNote'
import { NoteTitleInput } from '@/components/NoteTitleInput'
import { NoteContentEditor } from '@/components/NoteContentEditor'
import { useUpdateNote } from '@/hooks/useUpdateNote'
import { useCreateNote } from '@/hooks/useCreateNote'
import { useDeleteNote } from '@/hooks/useDeleteNote'
import { useState, useEffect } from 'react'

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
    if (!isCreateMode && note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note, isCreateMode])

  const handleSave = async () => {
    if (isCreateMode) {
      try {
        const createdNote = await createMutation.mutateAsync({ title, content })
        if (createdNote) {
          navigate(`/notes`)
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

  const currentTitle = isCreateMode ? title : (note?.title ?? title)
  const currentContent = isCreateMode ? content : (note?.content ?? content)

  return (
    <div>
      <NoteTitleInput value={currentTitle} onChange={setTitle} />
      <NoteContentEditor value={currentContent} onChange={setContent} />
      <button
        onClick={handleSave}
        disabled={createMutation.isPending || updateMutation.isPending}
      >
        {createMutation.isPending || updateMutation.isPending
          ? 'Saving...'
          : 'Save'}
      </button>
      <button onClick={() => navigate('/notes')}>Back to Notes</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  )
}
