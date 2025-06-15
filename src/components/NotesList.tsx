import { useNotes } from '@/hooks/useNotes'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useLogout } from '@/hooks/useLogout'
import { useEffect, useState } from 'react'
import { Note } from '@/types/note'
import { NoteTitleInput } from './NoteTitleInput'
import { useUpdateNote } from '@/hooks/useUpdateNote'

const NotesListContainer = styled.div`
  font-family: sans-serif;
  color: #333;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  margin-bottom: 24px;
`

const MenuSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 24px;
`

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    color: #007bff;
  }
`

const NotesListSection = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`

const NotesListTitle = styled.h2`
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 16px;
  font-weight: normal;
`

const NoteListUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const NoteItem = styled.li<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 6px;
  background-color: ${({ isActive }) => (isActive ? '#e9ecef' : 'transparent')};
  font-weight: ${({ isActive }) => (isActive ? '600' : 'normal')};

  &:hover {
    background-color: #f1f3f5;
  }
`

const NoteTitle = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
`

const StyledNoteTitleInput = styled(NoteTitleInput)`
  border: none;
  font-size: 1rem;
  font-weight: 600;
  padding: 0;
  margin: 0;
  width: 100%;
  background: transparent;
  outline: none;
`

function NoteListItem({ note, isActive }: { note: Note; isActive: boolean }) {
  const navigate = useNavigate()
  const [title, setTitle] = useState(note.title)
  const updateMutation = useUpdateNote()

  useEffect(() => {
    setTitle(note.title)
  }, [note.title])

  const handleTitleBlur = () => {
    if (title !== note.title) {
      updateMutation.mutate({ id: note.id, title })
    }
  }

  return (
    <NoteItem isActive={isActive} onClick={() => navigate(`/notes/${note.id}`)}>
      <span>&#x1F4C4;</span>
      {isActive ? (
        <StyledNoteTitleInput
          value={title}
          onChange={setTitle}
          onBlur={handleTitleBlur}
        />
      ) : (
        <NoteTitle>{note.title || '제목 없음'}</NoteTitle>
      )}
    </NoteItem>
  )
}

export default function NotesList() {
  const navigate = useNavigate()
  const { noteId } = useParams()
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const { data: notes, isLoading: isNotesLoading } = useNotes()
  const { mutate: logout } = useLogout()

  useEffect(() => {
    if (!isUserLoading && !user) {
      navigate('/login')
    }
  }, [isUserLoading, user, navigate])

  if (isUserLoading || isNotesLoading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <NotesListContainer>
      <ProfileSection>
        <span>&#x1F464;</span>
        <span>{user.email}</span>
      </ProfileSection>

      <MenuSection>
        <MenuItem onClick={() => logout()}>
          <span>&#x21AA;</span>
          <span>로그아웃</span>
        </MenuItem>
        <MenuItem onClick={() => navigate('/notes/new')}>
          <span>&#x2B;</span>
          <span>노트 생성</span>
        </MenuItem>
      </MenuSection>

      <NotesListSection>
        <NotesListTitle>노트 목록</NotesListTitle>
        {!notes || notes.length === 0 ? (
          <p>노트가 없습니다.</p>
        ) : (
          <NoteListUl>
            {notes.map((note) => (
              <NoteListItem
                key={note.id}
                note={note}
                isActive={note.id === noteId}
              />
            ))}
          </NoteListUl>
        )}
      </NotesListSection>
    </NotesListContainer>
  )
}
