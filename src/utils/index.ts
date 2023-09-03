import { type RefreshTokenActionPayload } from '../actions'
import { type DeleteAuthStateCookieParameters, type SyncAuthStateCookieParameters, type DeleteAuthStateParameters, type RefreshTokenCallbackHandlerParameters, type RefreshTokenCallbackRequest, type SyncAuthStateParameters } from '../types'
import { deleteAuthStateCookie, syncAuthStateCookie } from './cookie'
import { deleteAuthStateToken, syncAuthStateToken } from './token'

export function handleRefreshInterval ({ state, dispatch, provider: { authName, authType, refresh } }: RefreshTokenCallbackHandlerParameters) {
  if (refresh == null) return

  dispatch({ type: 'ACTIVATE_REFRESH_TOKEN' })

  const { auth: authToken, refresh: refreshToken, user } = state

  const request: RefreshTokenCallbackRequest = {
    accessToken: { ...authToken },
    refreshToken: { ...refreshToken },
    user: user ?? {}
  }

  const refreshHandler = () => {
    refresh
      .apiCallback(request)
      .then(res => {
        if (res.success) {
          const { accessToken, refreshToken } = res

          const payload: RefreshTokenActionPayload = {
            ...res,
            auth: accessToken,
            refresh: refreshToken
          }

          syncAuthState({ authName, authType, payload })
          dispatch({ type: 'REFRESH_TOKEN', payload })
        }
      })
      .catch(err => { console.error('Error refreshing token:', err) })
  }

  if (state.isAuthenticated) {
    const id = setInterval(refreshHandler, refresh.interval)
    return () => {
      clearInterval(id)
    }
  }
}

export function syncAuthState ({ authType, ...props }: SyncAuthStateParameters | SyncAuthStateCookieParameters) {
  if (authType === 'token') {
    syncAuthStateToken(props)
  } else if (authType === 'cookie') {
    syncAuthStateCookie(props as SyncAuthStateCookieParameters)
  }
}

export function deleteAuthState ({ authType, ...props }: DeleteAuthStateParameters | DeleteAuthStateCookieParameters) {
  if (authType === 'token') {
    deleteAuthStateToken(props)
  } else if (authType === 'cookie') {
    deleteAuthStateCookie(props as DeleteAuthStateCookieParameters)
  }
}
