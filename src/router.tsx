import { createBrowserRouter, RouteObject } from 'react-router-dom'
import App from './App'
import IndexPage from './pages/Index'
import LoginPage from './pages/Login'
import JoinPage from './pages/Join'
import NotePage from './pages/Note'
import NotesPage from './pages/Notes'
import ErrorPage from './pages/Error'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <IndexPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'join', element: <JoinPage /> },
      { path: 'notes', element: <NotesPage /> },
      { path: 'notes/:noteId', element: <NotePage /> },
      { path: '*', element: <ErrorPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
