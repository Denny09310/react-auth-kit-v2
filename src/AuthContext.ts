import type React from 'react'
import { createContext, useContext } from 'react'
import type KnownActions from './actions'
import { type AuthProviderProps } from './AuthProvider'
import { type AuthState, type WithRequired } from './types'

interface AuthContextState {
  provider: WithRequired<AuthProviderProps, 'authName'>
  state: AuthState
  dispatch: React.Dispatch<KnownActions>
}

export const AuthContext = createContext<AuthContextState | undefined>(undefined as unknown as AuthContextState)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context == null) throw new Error('useAuth must be used inside an AuthProvider')
  return context
}
