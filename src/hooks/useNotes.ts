import { useQuery } from '@tanstack/react-query'
import { fetchNotes } from '@/apis/fetchNotes'
import { Note } from '@/types/note'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export function useNotes() {
  const { data: user } = useCurrentUser()
  return useQuery<Note[]>({
    queryKey: ['notes', user?.id],
    queryFn: fetchNotes,
    enabled: !!user,
  })
}
