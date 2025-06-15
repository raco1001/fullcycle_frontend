import NotesList from '@/components/NotesList'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useEffect } from 'react'

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff;
`

const Sidebar = styled.div`
  width: 320px;
  flex-shrink: 0;
  border-right: 1px solid #dee2e6;
  background-color: #f8f9fa;
  padding: 24px;
  overflow-y: auto;
`

const MainContent = styled.div`
  flex-grow: 1;
  padding: 48px 64px;
  overflow-y: auto;
`

const EmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #868e96;
  font-size: 1.2rem;
`

export default function NotesLayout() {
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const navigate = useNavigate()
  const { noteId } = useParams()

  useEffect(() => {
    if (!isUserLoading && !user) {
      navigate('/login')
    }
  }, [isUserLoading, user, navigate])

  if (isUserLoading) {
    return <div>Loading session...</div>
  }

  // A simple way to check if there is content to show in the Outlet
  const hasContent = noteId && (noteId === 'new' || (user && user.id))

  return (
    <LayoutContainer>
      <Sidebar>
        <NotesList />
      </Sidebar>
      <MainContent>
        {hasContent ? (
          <Outlet />
        ) : (
          <EmptyState>노트를 선택하거나 새로 만들어주세요.</EmptyState>
        )}
      </MainContent>
    </LayoutContainer>
  )
}
