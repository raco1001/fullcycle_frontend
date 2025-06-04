import React from 'react'
import { Navigate } from 'react-router-dom'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { User } from '@/types/user'

export interface WithAuthenticateProps {
  user: User
}

export function withAuthenticateUser<P>(
  Component: React.ComponentType<P & WithAuthenticateProps>,
) {
  return function Wrapper(props: P) {
    const { data: user } = useCurrentUser()
    if (!user) {
      return <Navigate to="/login" replace />
    }
    return <Component {...props} user={user} />
  }
}
