import { useNotes } from '@/hooks/useNotes'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useNavigate } from 'react-router-dom'

export default function NotesPage() {
  const navigate = useNavigate()
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const { data: notes, isLoading: isNotesLoading } = useNotes()

  if (isUserLoading) {
    return <div>Authenticating user...</div>
  }

  if (!user) {
    return <div>Please log in to view notes.</div>
  }

  if (isNotesLoading) {
    return <div>Loading notes...</div>
  }

  if (!notes || notes.length === 0) {
    return (
      <div>
        <h1>Notes</h1>
        <p>
          {notes === undefined || notes === null
            ? 'Could not load your notes. Please try again.'
            : 'No notes found. Create your first note!'}
        </p>
        <button
          onClick={() => {
            navigate('/notes/new')
          }}
        >
          새 메모
        </button>
      </div>
    )
  }

  return (
    <div>
      <h1>Notes for {user.email}</h1>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => navigate(`/notes/${note.id}`)}
            style={{ cursor: 'pointer' }}
          >
            {note.title}
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          navigate(`/notes/${'new'}`)
        }}
      >
        새 메모
      </button>
    </div>
  )
}
