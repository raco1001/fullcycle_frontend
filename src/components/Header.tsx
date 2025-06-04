import { useCurrentUser } from '@/hooks/useCurrentUser'
import { useLogout } from '@/hooks/useLogout'
import { useNavigate } from 'react-router-dom'

export default function Header() {
  const { data: user } = useCurrentUser()
  const { mutateAsync: performLogout } = useLogout()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await performLogout()
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header>
      <h1>My Notes</h1>
      {user && <button onClick={handleLogout}>Logout</button>}
    </header>
  )
}
