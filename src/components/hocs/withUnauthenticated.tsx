import React from 'react'
import { Navigate } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/useCurrentUser'

export function withUnauthenticated<P extends React.Attributes>(
  Component: React.ComponentType<P>,
) {
  return function Wrapper(props: P) {
    const { data: user } = useCurrentUser()
    if (user) {
      return <Navigate to="/notes" replace />
    }
    return <Component {...props} />
  }
}
